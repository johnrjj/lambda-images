import * as aws from 'aws-sdk';

const dynamodb = new aws.DynamoDB();

const DDB_TABLE = process.env.DYNAMO;

const updateDescription = (key: string, description: string) => {
  return new Promise((accept, reject) => {
    let params = {
      TableName: DDB_TABLE,
      Item: {
        key: { S: key },
        lastUpdatedtimestamp: { S: (new Date().toJSON().toString()) }
      }
    };

    const updateDescriptionParams: aws.DynamoDB.UpdateItemInput = {
      TableName: DDB_TABLE,
      Key: { key },
      UpdateExpression: "set description = :d",
      ExpressionAttributeValues: {
        ":d": description,
      },
      ReturnValues: "UPDATED_NEW"
    };

    const updateCounterParams: aws.DynamoDB.UpdateItemInput = {
      TableName: DDB_TABLE,
      Key: {
        key: 'counter',
      },
      UpdateExpression: "set count = count + :val",
      ExpressionAttributeValues: {
        ":val": 1
      },
      ReturnValues: "UPDATED_NEW"
    };

    dynamodb.updateItem(updateDescriptionParams, (err, data) => {
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
  const body = JSON.parse(event.body);
  console.log(body);
 
  const fileKey: string = body.key;
  const description: string = body.description;
  console.log(fileKey, description);

  const x = await updateDescription(fileKey, description);

  console.log(x);

  return x;
};

const handler = (event, context, callback) => {
  console.log('called...');
  driver(event, context, callback)
    .then(x => callback(null, x))
    .catch(err => callback(err));
}

export {
  handler as updateDescription,
};