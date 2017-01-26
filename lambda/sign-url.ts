import { S3 } from 'aws-sdk';

const signUrl = async (event, context) =>
  new Promise((accept, reject) => {
    const s3 = new S3({signatureVersion: 'v4'});
    const now = Date.now();
    const key = now.toString();
    const params = {
      Bucket: 'image-service-jj-2',
      Key: '1234',
      ContentType: 'image/png',
      ACL: 'authenticated-read',
      Expires: 60
    };
    return s3.getSignedUrl('putObject', params, (err, url) => err ? reject(err) : accept(url));
  });

const getSignedUrl = (event, context, callback) => {
  return signUrl(event, context)
    .then(url => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: url,
          input: event,
          context,
        }),
      };
      callback(null, response);
    })
    .catch(e => callback(e));
};

export {
  getSignedUrl,
};