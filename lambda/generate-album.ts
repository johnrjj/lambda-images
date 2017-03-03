import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { extension } from 'mime';
import { Context, Callback } from 'aws-lambda';
import { createCollection } from './repositories/collection';
import { createFileMetadata } from './repositories/file';


AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const FILE_DDB_TABLE = process.env.DYNAMO;
const COLLECTION_DDB_TABLE = process.env.COLLECTION_TABLE;

const s3 = new AWS.S3();

const generateUniqueKey = (): string => uuid();

const generateS3PresignedUrl = (actionKey: string, parameters): Promise<string> =>
  new Promise((resolve, reject) =>
    s3.getSignedUrl(actionKey, parameters, (err, url) =>
      (err)
        ? reject(err)
        : resolve(url)));

export interface ImageFromClientApi {
  type: string;
}

const generateAlbum = async (event: any, context: Context, callback: Callback) => {
  const { body } = event;

  if (!body) {
    callback(new Error("Body null in generateAlbum POST request"));
  }

  try {
    const images: Array<ImageFromClientApi> = JSON.parse(body);

    const imagesWithPresignedUrls = await Promise.all(images.map(async image => {

      // todo this should return a 400 but the control flow is messed up (nested async mapping)
      if (!image.type) {
        throw new Error(`Image missing (mime) type: ${JSON.stringify(image)}`);
      }

      const fileType = extension(image.type);

      const id = generateUniqueKey();
      const s3Key = `${id}.${fileType}`;
      const presignedUrl = await generateS3PresignedUrl('putObject', {
        Bucket: process.env.BUCKET,
        Key: s3Key,
        ContentType: 'application/octet-stream',
        ACL: 'public-read',
      });

      return Object.assign(image, { presignedUrl, id, fileType, s3Key });
    }));

    const albumId = generateUniqueKey();

    const entries: Array<string> = imagesWithPresignedUrls.map(image => image.id);

    const album = {
      url: albumId,
      id: albumId, // needed for dynamo...
      entries, // for dynamo...
      images: imagesWithPresignedUrls, // for frontend...
    };

    const x = await createCollection(album);
    console.log(x);

    // todo: do this batched...
    const res = await Promise.all(imagesWithPresignedUrls.map(image => createFileMetadata(image.id)));
    console.log('response from storing metadata', res);

    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      statusCode: 200,
      body: JSON.stringify({ event, context, album }),
    };

    return callback(null, response);
  } catch (err) {
    callback(err);
  }
}

export {
  generateAlbum,
};
