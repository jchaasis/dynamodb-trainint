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


docClient.update({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'hulk',
        timestamp: 20
    },
    UpdateExpression: 'set #v = #v + :incr',
    ExpressionAttributeNames: {
        '#v': 'views'
    },
    ExpressionAttributeValues: {
        ':incr': 1
    }
}, callback)