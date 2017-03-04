import * as AWS from 'aws-sdk';

const FILE_DDB_TABLE = process.env.DYNAMO; // get this out of here, lazy lol

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const getFileData = (fileId) => {
  return new Promise((accept, reject) => {
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: FILE_DDB_TABLE,
      KeyConditionExpression: "#id = :id",
      ExpressionAttributeNames: {
        "#id": "id",
      },
      ExpressionAttributeValues: {
        ":id": fileId,
      }
    };
    docClient.query(params, (err, data) => {
      if (err) {
        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
        reject(err);
      } else {
        console.log("Query succeeded.");
        data.Items.forEach(item => console.log(item));
        accept(data);
      }
    });
  });
}

const updateMetadata = (id: string, s3Key: string): Promise<AWS.DynamoDB.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    const updateDescriptionParams: AWS.DynamoDB.UpdateItemInput = {
      TableName: FILE_DDB_TABLE,
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

const updateDatabaseWithThumbnailKey = (fileId: string, thumbnailS3Key: string): Promise<AWS.DynamoDB.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    const updateDescriptionParams: AWS.DynamoDB.UpdateItemInput = {
      TableName: FILE_DDB_TABLE,
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



const updateDatabaseWithMediaMetadata = (id: string, height: number, width: number): Promise<AWS.DynamoDB.UpdateItemOutput> => {
  return new Promise((accept, reject) => {
    const updateDescriptionParams: AWS.DynamoDB.UpdateItemInput = {
      TableName: FILE_DDB_TABLE,
      Key: { id },
      UpdateExpression: 'set height = :h, width = :w',
      ExpressionAttributeValues: {
        ':h': height,
        ':w': width,
      },
      ReturnValues: "UPDATED_NEW"
    };
    docClient.update(updateDescriptionParams, (err, data) => {
      return (err)
        ? console.log('err putting', err) || reject(err)
        : console.log('succesfullyput item', data) || accept(data);
    });
  });
}


const createFileMetadata = (id: string) => {
  return new Promise((accept, reject) => {
    let params = {
      TableName: FILE_DDB_TABLE,
      Item: {
        id: { S: id },
        timestamp: { S: (new Date().toJSON().toString()) }
      }
    };
    dynamodb.putItem(params, (err, data) => {
      if (err) {
        console.log('error putting item', err);
        reject(err);
      } else {
        console.log('succesfullyput item', data);

        accept(data);
      }
    });
  });
};

const downloadFile = ({ Bucket, Key }: { Bucket: string, Key: string }) => {
  const params: AWS.S3.GetObjectRequest = { Bucket, Key };
  return new Promise((accept, reject) => {
    s3.getObject(params, (err, data) =>
      (err) ? reject(err) : accept(data));
  });
};

const uploadFile = ({ Bucket, Key, Body, ContentType, Metadata, ACL }) => {
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


export {
  getFileData,
  createFileMetadata,
  updateMetadata,
  updateDatabaseWithMediaMetadata,
  updateDatabaseWithThumbnailKey,
  downloadFile,
  uploadFile,
}

