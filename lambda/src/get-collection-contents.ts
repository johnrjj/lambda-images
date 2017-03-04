import * as AWS from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import { getFileData } from './repositories/file';
import { getCollectionContents } from './repositories/collection';
import { jsonToResponse } from './util';

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

const getCollectionContentsWrapper = async (collectionId) => {
    const collectionEntries: Array<string> = await getCollectionContents(collectionId);
    const files = await getFileSrcUrl(collectionEntries);
    return {
      collectionId,
      entries: collectionEntries, 
      files,
    }
}

const handler = async (event: any, context: Context, callback: Callback) => {
  console.log('event', event);
  console.log('context', context);
  const collectionId: string = event.pathParameters.id;
  try {
    const collectionContents = await getCollectionContentsWrapper(collectionId);
    console.log(collectionContents);
    const response = jsonToResponse(collectionContents);
    console.log(response);
    callback(null, response);
  } catch (e) {
    callback(e);
  }
}

export {
  handler as getCollectionContents,
};
