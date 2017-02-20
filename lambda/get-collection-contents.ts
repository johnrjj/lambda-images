import * as AWS from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';

const FILE_DDB_TABLE = process.env.DYNAMO;
const COLLECTION_DDB_TABLE = process.env.COLLECTION_TABLE;

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const getCollectionContentsFromDynamo = (collectionId: string): Promise<Array<string>> => {
  return new Promise((accept, reject) => {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: COLLECTION_DDB_TABLE,
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
        const entries: Array<string> = data.Items[0].entries
        accept(entries);
      }
    });
  });
};

const getCollectionContents = async (event: any, context: Context, callback: Callback) => {
  console.log('event', event);
  console.log('conext', context);
  try {
    const collectionId = event.pathParameters.id;
    const collectionEntries: Array<string> = await getCollectionContentsFromDynamo(collectionId);
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      statusCode: 200,
      body: JSON.stringify({ 
        event, 
        context, 
        collectionId, 
        entries: collectionEntries, 
      }),
    };
    return callback(null, response);
  } catch (err) {
    callback(err);
  }
}

export {
  getCollectionContents,
};
