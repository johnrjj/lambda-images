import * as aws from 'aws-sdk';

const DDB_TABLE = process.env.DYNAMO; 

const dynamodb = new aws.DynamoDB();

const storeMetadata = (key: string, s3Key: string) => {
  return new Promise((accept, reject) => {
    let params = {
      TableName: DDB_TABLE,
      Item: {
        key: { S: key },
        image: { S: s3Key },
        timestamp: { S: (new Date().toJSON().toString()) }
      }
    };

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
  console.log(event, context);
  await storeMetadata('1', '1');
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