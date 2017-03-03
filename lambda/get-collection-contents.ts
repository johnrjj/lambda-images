import * as AWS from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import { getFileData } from './repositories/file';
import { getCollectionContents } from './repositories/collection';

const FILE_DDB_TABLE = process.env.DYNAMO;
const COLLECTION_DDB_TABLE = process.env.COLLECTION_TABLE;

const getFileSrcUrl = async (fileIds: Array<string>): Promise<Array<any>> => {
  const queryResults: Array<AWS.DynamoDB.DocumentClient.QueryOutput> = await Promise.all(fileIds.map(getFileData))
  const transformedResults = queryResults.map(queryResult => {
    if (queryResult.Items && queryResult.Items[0]) {
      return queryResult.Items[0];
    }
    return;
  });

  return transformedResults;
}

const getCollectionContentsWrapper = async (event: any, context: Context, callback: Callback) => {
  console.log('event', event);
  console.log('context', context);
  try {
    const collectionId = event.pathParameters.id;
    const collectionEntries: Array<string> = await getCollectionContents(collectionId);
    const files = await getFileSrcUrl(collectionEntries);
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
        files,
      }),
    };
    return callback(null, response);
  } catch (err) {
    callback(err);
  }
}

export {
  getCollectionContentsWrapper as getCollectionContents,
};
