const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

const callback = (err, data) => {
    if (err) {
        console.log(err);
    };
    if (data) {
        console.log(data);
    };
}

// docClient.put({
//     TableName: 'td_notes_sdk',
//     Item: {
//       user_id: 'bb',
//       timestamp: 2, 
//       title: 'changed title',
//       content: 'changed content'
//     }
// }, callback)

// docClient.update({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: 'bb',
//         timestamp: 1
//     },
//     UpdateExpression: 'set #t = :t',
//     ExpressionAttributeNames:{
//         '#t': 'title' 
//     },
//     ExpressionAttributeValues: {
//         ':t': 'Updated Title'
//     }
// }, callback)

// docClient.delete({
//     TableName: 'td_notes_sdk',
//     Key: {
//         user_id: 'bb',
//         timestamp: 1
//     }
// }, callback);

docClient.batchWrite({
    RequestItems: {
        'td_notes_sdk':[
            {
                DeleteRequest: {
                    Key: {
                        user_id: 'bb',
                        timestamp: 2
                    }
                },
            },
            {
                PutRequest: {
                    Item: {
                        user_id: 'new one',
                        timestamp: 4,
                        title: 'new title meow',
                        content: 'awesome content'
                    }
                },
            },
            {
                PutRequest: {
                    Item: {
                        user_id: 'hulk',
                        timestamp: 20,
                        title: 'smash',
                        content: 'hulk smash'
                    }
                }
            }
        ]
    }
}, callback)