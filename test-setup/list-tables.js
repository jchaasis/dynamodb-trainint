const AWS = require("aws-sdk");
// console.log('aws config: ', AWS.config);
console.log('process.env: ', process.env)

const {AWS_DEFAULT_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

const credentials = {
    accesKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
};

AWS.config.update({
     region: 'us-east-1',
    //  Credentials: credentials
});

const dynamodb = new AWS.DynamoDB();
console.log('dynamodb: ', dynamodb);
dynamodb.listTables((err, data)=>{
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});