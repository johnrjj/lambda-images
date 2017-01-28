import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const generateS3PresignedUrl = (actionKey: string, parameters): Promise<string> =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(actionKey, parameters, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })

const getSignedUrl = async (event, context, callback) => {
  try {
    const url = await generateS3PresignedUrl('putObject', {
      Bucket: process.env.BUCKET,
      Key: '1234',
      ContentType: 'application/octet-stream',
      ACL: 'public-read',
    });
    const response = {
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
