import { DynamoDB, SES } from 'aws-sdk';
const dynamodb = new DynamoDB();

// I know I could solve this with higher order functions, but typescript's type system gets funky real fast..this is faster.
const get = (params: AWS.DynamoDB.Types.GetItemInput): Promise<AWS.DynamoDB.Types.GetItemOutput> => {
  return new Promise((accept, reject) => {
    dynamodb.getItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        accept(data);
      }
    })
  });
};

const update = (params: AWS.DynamoDB.Types.UpdateItemInput): Promise<AWS.DynamoDB.Types.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    dynamodb.updateItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        accept(data);
      }
    })
  });
};

const put = (params: AWS.DynamoDB.Types.PutItemInput): Promise<AWS.DynamoDB.Types.PutItemOutput> => {
  return new Promise((accept, reject) => {
    dynamodb.putItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        accept(data);
      }
    })
  });
};

export {
  get,
  update,
  put,
};