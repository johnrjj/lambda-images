import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { extension } from 'mime';
import { Context, Callback } from 'aws-lambda';

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const DDB_TABLE = process.env.DYNAMO;

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB();

const storeMetadata = (key: string, s3Key: string) => {
  return new Promise((accept, reject) => {
    let params = {
      TableName: DDB_TABLE,
      Item: {
        key: { S: key },
        timestamp: { S: (new Date().toJSON().toString()) }
      }
    };
    dynamodb.putItem(params, (err, data) => {
      if (err) {
        console.log('error putting item', err);
        reject(err);
      } else {
        console.log('succesfullyput item', data);

        accept(data);
      }
    });
  });
};

const generateUniqueKey = (): string => {
  const id: string = uuid();
  return id;
}

const generateS3PresignedUrl = (actionKey: string, parameters): Promise<string> =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(actionKey, parameters, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  });

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

    const album = {
      url: generateUniqueKey(),
      images: imagesWithPresignedUrls,
    };

    // generate metadata here!!!
    const res = await Promise.all(imagesWithPresignedUrls.map(image => storeMetadata(image.id, image.s3Key)));
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
