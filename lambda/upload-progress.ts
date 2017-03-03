import * as AWS from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import { getFileData } from './repositories/file';


const FILE_DDB_TABLE = process.env.DYNAMO;
const COLLECTION_DDB_TABLE = process.env.COLLECTION_TABLE;

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

const getCollectionContents = (collectionId: string): Promise<Array<string>> => {
  return new Promise((accept, reject) => {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: COLLECTION_DDB_TABLE,
      // ProjectionExpression: "#yr, title, info.genres, info.actors[0]",
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

const checkIfFilesAreProcessed = async (fileIds: Array<string>): Promise<any> => {
  const queryResults: Array<AWS.DynamoDB.DocumentClient.QueryOutput> = await Promise.all(fileIds.map(getFileData));
  const transformedResults = queryResults.map(queryResult => {
    if (queryResult.Items && queryResult.Items[0]) {
      return queryResult.Items[0];
    }
    return;
  });

  console.log('transformedResults', transformedResults);

  const isDone = transformedResults.reduce((flag, x) => {
    if (!x.s3key) {
      console.log(x, 'is not done yet!!');
      return false;
    }
    return flag;
  }, true);

  console.log(isDone);

  return {
   entries: transformedResults,
   processed: isDone, 
  };
}

const checkCollectionStatus = async (event: any, context: Context, callback: Callback) => {
  console.log('event', event);
  console.log('conext', context);
  try {
    const collectionId = event.pathParameters.id;
    const collectionEntries: Array<string> = await getCollectionContents(collectionId);
    console.log(collectionEntries);
    const files = await checkIfFilesAreProcessed(collectionEntries);
    console.log(files);
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      statusCode: 200,
      body: JSON.stringify({ 
        event, 
        context, 
        collectionId, 
        entries2: collectionEntries,
        entries: files.entries,
        processed: files.processed,
      }),
    };
    return callback(null, response);
  } catch (err) {
    callback(err);
  }
}

export {
  checkCollectionStatus,
};
