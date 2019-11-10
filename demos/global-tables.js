const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1'})

const docClient = new AWS.DynamoDB.DocumentClient();
const EUregion = 'eu-central-1';
const EUdocClient = new AWS.DynamoDB.DocumentClient({
    region: EUregion
});

docClient.put({
    TableName: 'global_td_notes',
    Item: {
        user_id: 'abcd',
        timestamp: 5,
        title: 'abcd title',
        content: 'abcd content'
    }
}, (err, data) => {
    if (err) return console.log('error: %O', err);

    console.log('Put operation successful in ', AWS.config.region);
    console.log(data);

    setTimeout(() => {
        EUdocClient.get({
            TableName: 'global_td_notes',
            Key: {
                user_id: 'abcd',
                timestamp: 5
            }
        }, (err, data) => {
            if (err) return console.log('error getting: %O', err);
            
            console.log('Getting the item from %s', EUregion);
            console.log('data:', data);
        });
    }, 1000)
})