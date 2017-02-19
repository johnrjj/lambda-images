import * as aws from 'aws-sdk';
// import { }
import * as gm from 'gm';

const DDB_TABLE: string = process.env.DYNAMO;
const THUMBNAIL_BUCKET: string = process.env.THUMBNAIL_BUCKET;

const DEFAULT_MAX_WIDTH: number = 200;
const DEFAULT_MAX_HEIGHT: number = 200;

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

const updateDatabaseWithS3Key = (id: string, s3Key: string): Promise<aws.DynamoDB.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    const updateDescriptionParams: aws.DynamoDB.UpdateItemInput = {
      TableName: DDB_TABLE,
      Key: {
        id,
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

const updateDatabaseWithThumbnailKey = (fileId: string, thumbnailS3Key: string): Promise<aws.DynamoDB.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    const updateDescriptionParams: aws.DynamoDB.UpdateItemInput = {
      TableName: DDB_TABLE,
      Key: {
        id: fileId,
      },
      UpdateExpression: "set thumbnails3key = :d",
      ExpressionAttributeValues: {
        ":d": thumbnailS3Key,
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


const storeMetadata = (id, dstKey) => {
  return new Promise((accept, reject) => {
    let params = {
      TableName: DDB_TABLE,
      Item: {
        id: { S: id },
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