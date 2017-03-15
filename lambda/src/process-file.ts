import * as aws from 'aws-sdk';
import * as gm from 'gm';
import { 
  updateDatabaseWithThumbnailKey, 
  updateDatabaseWithMediaMetadata, 
  updateMetadata as updateDatabaseWithS3Key,
  downloadFile,
  uploadFile,
} from './repositories/file';
import { resizeImage, getImageDimensions } from './util/image-processing';

const FILE_DDB_TABLE: string = process.env.DYNAMO;
const THUMBNAIL_BUCKET: string = process.env.THUMBNAIL_BUCKET;

const DEFAULT_MAX_WIDTH: number = 200;
const DEFAULT_MAX_HEIGHT: number = 200;

const imageTransform = gm.subClass({
  imageMagick: true,
});

const s3 = new aws.S3();

// const processFile = async (fileBucket, fileKey) => {
//   const result = processImage()
// };

const createThumbnail = async (imgBuffer: Buffer) => {
  const thumbnail = await resizeImage(imgBuffer, 200, 200);

}

const processImage = async (uploadedImageBucket: string, uploadedImageKey: string) => {
  const fileId: string = uploadedImageKey.split('.')[0];  // 123456789.png => '123456789'
  await updateDatabaseWithS3Key(fileId, uploadedImageKey);

  const s3Object = await downloadFile({
    Bucket: uploadedImageBucket,
    Key: uploadedImageKey,
  });

  const imgBuffer: Buffer = s3Object.Body as Buffer;
  const { width, height } = await getImageDimensions(imgBuffer);

  console.log(width, height);
  
  const resizedImage: Buffer = await resizeImage(imgBuffer);

  console.log('sup fam');

  console.log(width, height);

  // const { width, height } = await getImageDimensions(resizedImage);
  const res = await updateDatabaseWithMediaMetadata(fileId, height, width);
  console.log(res);

  const thumbnailS3Key = `thumbs/${uploadedImageKey}`;
  await uploadFile({
    Key: thumbnailS3Key,
    Bucket: THUMBNAIL_BUCKET,
    Body: resizedImage,
    ContentType: s3Object.ContentType,
    Metadata: null,
    ACL: 'public-read',
  });

  await updateDatabaseWithThumbnailKey(fileId, thumbnailS3Key);
};

const handler = async (event, context, callback: (err?, response?) => never) => {
  console.log(event);
  console.log(context);
  const srcBucket: string = event.Records[0].s3.bucket.name;
  const srcKey: string = event.Records[0].s3.object.key;
  try {
    const res = await processImage(srcBucket, srcKey);
    callback(null, res);
  } catch (e) {
    callback(e);
  }
}

export {
  handler as processFile,
};