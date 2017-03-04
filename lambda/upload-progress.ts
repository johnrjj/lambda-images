import * as AWS from 'aws-sdk';
import { Context, Callback } from 'aws-lambda';
import { getFileData } from './repositories/file';
import { jsonToResponse } from './util';
import { getCollectionContents } from './repositories/collection';

const FILE_DDB_TABLE = process.env.DYNAMO;
const COLLECTION_DDB_TABLE = process.env.COLLECTION_TABLE;

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
    if (!x['s3key']) {
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

const checkCollectionStatus = async (collectionId: string) => {
  const collectionEntries: Array<string> = await getCollectionContents(collectionId);
  console.log(collectionEntries);
  const files = await checkIfFilesAreProcessed(collectionEntries);
  console.log(files);
  return {
    collectionId,
    entries2: collectionEntries,
    entries: files.entries,
    processed: files.processed,
  }
}

const handler = async (event: any, context: Context, callback: Callback) => {
  console.log('event', event);
  const collectionId = event.pathParameters.id;
  console.log('context', context);
  try {
    const status = await checkCollectionStatus(collectionId);
    const response = jsonToResponse(status);
    console.log(response);
    callback(null, response);
  } catch (e) {
    callback(e);
  }
}

export {
  handler as checkCollectionStatus,
};
