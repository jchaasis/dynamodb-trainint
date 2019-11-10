const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

const callback = (err, data) => {
    if (err) {
        console.log(err);
    };
    if (data) {
        console.log(JSON.stringify(data,null,2));
    };
}

// docClient.get({
//     TableName: 'td_notes_test',
//     Key: {
//         user_id: 'A',
//         timestamp: 1
//     }
// }, callback)

// docClient.query({
//     TableName: 'td_notes_test',
//     KeyConditionExpression: 'user_id = :uid',
//     FilterExpression: '#cat = :cat',
//     ExpressionAttributeNames: {
//         '#cat': 'cat'
//     },
//     ExpressionAttributeValues: {
//         ':uid': 'A',
//         ':cat': 'aws',
//     }
// }, callback)

// docClient.scan({
//     TableName: 'td_notes_test',
//     FilterExpression: 'cat = :cat',
//     ExpressionAttributeValues: {
//         ':cat': 'general'
//     }
// }, callback)

docClient.batchGet({
    RequestItems: {
        'td_notes_test': {
            Keys: [
                {
                 user_id: 'A',
                 timestamp: 1   
                }, 
                {
                    user_id: 'B',
                    timestamp: 2
                }
            ]
        },
        'td_notes_sdk': {
            Keys: [
                {
                    user_id: 'hulk',
                    timestamp: 20 
                   }, 
            ]
        }
    }
}, callback)