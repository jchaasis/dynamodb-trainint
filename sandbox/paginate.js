const async = require('async');
const _ = require('underscore');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1'});

const docClient = new AWS.DynamoDB.DocumentClient();

let startKey = [];
let results = [];
let pages = 0;
console.log('doing stuff....')
async.doWhilst(
    //iteratee
    (cb) => {
        let params = {
            TableName: 'td_notes_test',
            Limit: 3,
        };

        if(!_.isEmpty(startKey)) {
            console.log('start key is not empty')
            params.ExclusiveStartKey = startKey
            console.log('new start key is : ', startKey);
        }

        docClient.scan(params, (err, data) => {
            if(err) {
                console.error('there was an error: ', err);
                cb(err, {});
            } else {
                if ( typeof data.LastEvaluatedKey !== 'undefined') {
                    console.log('found a key: ', data.LastEvaluatedKey)
                    startKey = data.LastEvaluatedKey
                } else {
                    startKey = [];
                }
                
                if(!_.isEmpty(data.Items)){
                    results = _.union(results, data.Items)
                }

                pages++;
                cb(null, results)
            }

            console.log('pages in itaratee: ', pages)
        });
    },
    // truth test
    (results, callback) => {
        if (_.isEmpty(startKey)) {
            console.log('start key is empty')
            return callback(null,false);
        } else {
            console.log('start key is NOT empty')
            return callback(null,true);
        }
    },
    //call back
    (err, data) => {
        console.log('running callback')
        if (err) {
            console.log('there was an error: ',err)
        } else {
            console.log('found some data: ', data);
            console.log('Item Count', data.length);
            console.log('Pages', pages);
        };
    }
);

