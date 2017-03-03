import * as aws from 'aws-sdk';
import * as gm from 'gm';
import { updateDatabaseWithThumbnailKey, updateDatabaseWithMediaMetadata, updateMetadata as updateDatabaseWithS3Key } from './repositories/file';

const FILE_DDB_TABLE: string = process.env.DYNAMO;
const THUMBNAIL_BUCKET: string = process.env.THUMBNAIL_BUCKET;

const DEFAULT_MAX_WIDTH: number = 200;
const DEFAULT_MAX_HEIGHT: number = 200;

const imageTransform = gm.subClass({
  imageMagick: true,
});

const s3 = new aws.S3();

const getImageType = (key: string, cb) => {
  const foundType = key.match(/\.([^.]*)$/);
  if (!foundType) {
    throw Error(`Could not determine image type for ${key}`);
  }
  const imageType = foundType[1];

  if (imageType !== 'jpg' && imageType !== 'png') {
    throw Error(`Unsupported image type ${imageType}`);
  }
  return imageType;
};

const downloadImage = ({ Bucket, Key }) =>
  new Promise((accept, reject) => {
    s3.getObject({ Bucket, Key }, (err, data) =>
      (err) ? reject(err) : accept(data));
  });

const transformImage = (s3ImageObject, imageType): Promise<{ contentType, metadata, buffer, originalHeight, originalWidth, height, width }> => {
  return new Promise((accept, reject) => {
    const image = imageTransform(s3ImageObject.Body)
    image.size((err, size) => {
      const metadata = s3ImageObject.Metadata;
      const maxWidth = ('width' in metadata) ? metadata.width : DEFAULT_MAX_WIDTH;
      const maxHeight = ('height' in metadata) ? metadata.height : DEFAULT_MAX_HEIGHT;
      const scalingFactor = Math.min(maxWidth / size.width, maxHeight / size.height);
      const width = scalingFactor * size.width;
      const height = scalingFactor * size.height;

      image.resize(width, height).toBuffer(imageType, (err, buffer) => {
        return (err)
          ? reject(err)
          : accept({
              contentType: s3ImageObject.ContentType,
              metadata,
              buffer,
              originalHeight: size.height,
              originalWidth: size.width,
              height: height,
              width: width,
          });
      });
    });
  });
};

const uploadThumbnail = ({ Bucket, Key, Body, ContentType, Metadata, ACL }) => {
  return new Promise((accept, reject) => {
    s3.putObject({
      Bucket,
      Key,
      Body,
      ContentType,
      Metadata,
      ACL,
    }, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return accept(true);
      }
    });
  });
};


const driver = async (event, context, callback) => {
  const srcBucket: string = event.Records[0].s3.bucket.name;
  const srcKey: string = event.Records[0].s3.object.key;

  const dstBucket: string = THUMBNAIL_BUCKET;
  const dstKey = `thumbs/${srcKey}`;

  const fileKey: string = srcKey.split('.')[0];  // 123456789.png => '123456789'

  await updateDatabaseWithS3Key(fileKey, srcKey);

  const imageType = getImageType(srcKey, callback);

  const s3Object = await downloadImage({
    Bucket: srcBucket,
    Key: srcKey,
  });

  const transformData = await transformImage(s3Object, imageType);

  // original = height width of the original image in s3. i know it's a weird place to do this, move it...
  const { height, width, originalHeight, originalWidth } = transformData;
  console.log(height, width);
  const res = await updateDatabaseWithMediaMetadata(fileKey, originalHeight, originalWidth);
  console.log(res);

  await uploadThumbnail({
    Key: dstKey,
    Bucket: dstBucket,
    Body: transformData.buffer,
    ContentType: transformData.contentType,
    Metadata: transformData.metadata,
    ACL: 'public-read',
  });

  await updateDatabaseWithThumbnailKey(fileKey, dstKey);
};

const handler = (event, context, callback) => {
  console.log('called...');
  driver(event, context, callback)
    .then(callback)
    .catch(err => callback(err));
}

export {
  handler as createThumbnail,
};