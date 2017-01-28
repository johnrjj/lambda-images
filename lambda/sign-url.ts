import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { extension } from 'mime';
import { Context, Callback } from 'aws-lambda';

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

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

const getSignedUrl = async (event: any, context: Context, callback: Callback) => {
  console.log('Dumping event', event);
  console.log('Dumping context', context);
  let fileType = null;
  if (event.headers['Content-Type']) {
    const mimeType = event.headers['Content-Type'];
    fileType = extension(mimeType);
    console.log(`Detected file type: ${fileType}`);
  } else {
    fileType = 'png';
  }
  try {
    const url = await generateS3PresignedUrl('putObject', {
      Bucket: process.env.BUCKET,
      Key: `images/${generateUniqueKey()}.${fileType}`,
      ContentType: 'application/octet-stream',
      ACL: 'public-read',
    });
    const response = {
      headers: {
        'Access-Control-Allow-Origin' : '*', // Required for CORS support to work
      },
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
    return callback(null, response);
  } catch (err) {
    return callback(err);
  }
};

export {
  getSignedUrl,
};