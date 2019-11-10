const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'})

const dynamodb = new AWS.DynamoDB();

const callback = (err, data) => {
        if(err) {
            console.log(err);
        }
    
        if(data) {
            console.log(JSON.stringify(data,null,2))
        }
    }
// dynamodb.listTables({}, callback);

// dynamodb.describeTable({
//     TableName: 'td_notes_sdk'
// }, callback)

// dynamodb.createTable({
//     TableName: "td_notes_sdk",
//     AttributeDefinitions: [
//         {
//             AttributeName: "user_id",
//             AttributeType: 'S'
//         },
//         {
//             AttributeName: 'timestamp',
//             AttributeType: 'N'
//         }
//     ],
//     KeySchema: [
//         {
//             AttributeName: "user_id",
//             KeyType: 'HASH'
//         },
//         {
//             AttributeName: 'timestamp',
//             KeyType: 'RANGE'
//         }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 1,
//         WriteCapacityUnits: 1
//     }
// }, callback)

// dynamodb.updateTable({
//     TableName: 'td_notes_sdk',
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 2,
//         WriteCapacityUnits: 1
//     }
// }, callback)

// dynamodb.deleteTable({
//     TableName: 'td_notes_sdk',
// }, callback)