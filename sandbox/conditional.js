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

docClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: 'ABC',
        timestamp: 1,
        title: 'Initial title',
        content: 'Initial Content',
    },
    ConditionExpression: '#t <> :t',
    ExpressionAttributeNames: {
        '#t': 'timestamp'
    },
    ExpressionAttributeValues: {
        ':t': 1
    }
}, callback)