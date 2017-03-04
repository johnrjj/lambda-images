import * as AWS from 'aws-sdk';

const COLLECTION_DDB_TABLE = process.env.COLLECTION_TABLE;

const docClient = new AWS.DynamoDB.DocumentClient();

const getCollectionContents = (collectionId: string, tableName: string = COLLECTION_DDB_TABLE): Promise<Array<string>> => {
  return new Promise((accept, reject) => {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: tableName,
      KeyConditionExpression: '#id = :id',
      ExpressionAttributeNames: {
        '#id': 'id',
      },
      ExpressionAttributeValues: {
        ":id": collectionId,
      }
    };

    docClient.query(params, (err, data) => {
      if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        data.Items.forEach(item => console.log(item));
        const entries: Array<string> = data.Items[0]['entries'];
        accept(entries);
      }
    });
  });
};

const createCollection = (album: any) => {
  return new Promise((accept, reject) => {
    const params = {
      TableName: COLLECTION_DDB_TABLE,
      Item: album,
    };
    return docClient.put(params, function (err, data) {
      if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
        accept(data)
      }
    });
  })
};


const createClient = (tableName: string) => ({
  getCollectionContents
});

export {
  getCollectionContents,
  createCollection,
}