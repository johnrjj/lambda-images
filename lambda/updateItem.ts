var docClient = new AWS.DynamoDB.DocumentClient();
var table = "Movies";
// Update the item, unconditionally,

var params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: table,
    Key: {
        key: "album.key",
    },
    UpdateExpression: 'SET #attrName = list_append(if_not_exists(#attrName, :empty_list), :attrValue)',// "SET #attrName = list_append(#attrName, :attrValue)",
    ExpressionAttributeNames: {
        "#attrName": "entries"
    },
    ExpressionAttributeValues: {
        ":attrValue": ["000989"],
        ":empty_list": [],
    },
    ReturnValues: "UPDATED_NEW",
};

console.log("Updating the item...");
docClient.update(params, function (err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});


// atomic vbelow


// var AWS = require("aws-sdk");

// AWS.config.update({
//   region: "us-west-2",
//   endpoint: "http://localhost:8000"
// });

// var docClient = new AWS.DynamoDB.DocumentClient()

// var table = "Movies";

// var year = 2015;
// var title = "The Big New Movie";

// // Increment an atomic counter

// var params = {
//     TableName:table,
//     Key:{
//         "year": year,
//         "title": title
//     },
//     UpdateExpression: "set info.rating = info.rating + :val",
//     ExpressionAttributeValues:{
//         ":val":1
//     },
//     ReturnValues:"UPDATED_NEW"
// };

// console.log("Updating the item...");
// docClient.update(params, function(err, data) {
//     if (err) {
//         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });