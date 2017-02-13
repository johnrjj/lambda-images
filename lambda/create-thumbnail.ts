import * as aws from 'aws-sdk';
// import { }
import * as gm from 'gm';

const DDB_TABLE = process.env.DYNAMO;

const DEFAULT_MAX_WIDTH = 200;
const DEFAULT_MAX_HEIGHT = 200;

const imageTransform = gm.subClass({
  imageMagick: true,
});

const s3 = new aws.S3();
const dynamodb = new aws.DynamoDB();

const docClient = new aws.DynamoDB.DocumentClient()

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

const downloadImage = ({Bucket, Key}) =>
  new Promise((accept, reject) => {
    s3.getObject({ Bucket, Key }, (err, data) => {
      return (err) ? reject(err) : accept(data);
    });
  });


const transformImage = (s3ImageObject, imageType): Promise<{ contentType, metadata, buffer }> => {
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
        if (err) {
          return reject(err);
        } else {
          return accept({
            contentType: s3ImageObject.ContentType,
            metadata,
            buffer,
          });
        }
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

const updateDatabaseWithS3Key = (key: string, s3Key: string): Promise<aws.DynamoDB.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    const updateDescriptionParams: aws.DynamoDB.UpdateItemInput = {
      TableName: DDB_TABLE,
      Key: {
        key,
      },
      UpdateExpression: "set s3key = :d",
      ExpressionAttributeValues: {
        ":d": s3Key,
      },
      ReturnValues: "UPDATED_NEW"
    };
    docClient.update(updateDescriptionParams, (err, data) => {
      if (err) {
        console.log('err putting', err);
        reject(err);
      } else {
        console.log('succesfullyput item', data);
        accept(data);
      }
    });
  });
}

const storeMetadata = (srcKey, dstKey) => {
  return new Promise((accept, reject) => {
    let params = {
      TableName: DDB_TABLE,
      Item: {
        key: { S: srcKey },
      }
    };

    // if ('author' in metadata) {
    //   params.Item['author'] = { S: metadata.author };
    // }
    // if ('title' in metadata) {
    //   params.Item['title'] = { S: metadata.title };
    // }
    // if ('description' in metadata) {
    //   params.Item['description'] = { S: metadata.description };
    // }

    dynamodb.putItem(params, (err, data) => {
      console.log('succesfullyput item', data);
      if (err) {
        reject(err);
      } else {
        accept(data);
      }
    });
  });
};

const driver = async (event, context, callback) => {
  console.log('Options from event: ', event);
  console.log('1');
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = event.Records[0].s3.object.key;
  console.log('2');
  console.log(srcBucket, srcKey);

  const dstBucket = srcBucket;
  const dstKey = `thumbs/${srcKey}`;
  console.log('3');
  console.log(dstBucket, dstKey);

  // const imageType = getImageType(srcKey, callback);
  console.log('4');

  // const s3Object = await downloadImage({
  //   Bucket: srcBucket,
  //   Key: srcKey,
  // });

  console.log('5');


  // const transformData = await transformImage(s3Object, imageType);

  console.log('6');


  // await uploadThumbnail({
  //   Key: dstKey,
  //   Bucket: dstBucket,
  //   Body: transformData.buffer,
  //   ContentType: transformData.contentType,
  //   Metadata: transformData.metadata,
  //   ACL: 'public-read',
  // });

  await updateDatabaseWithS3Key(srcKey.split(".")[0], dstKey);

  console.log('it worked');
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