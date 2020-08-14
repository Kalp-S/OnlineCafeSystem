const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const _ = require('lodash');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const doc = new AWS.DynamoDB.DocumentClient();
router.post('/', (req, res) => {
    const params = {
        TableName: 'User',
        KeyConditionExpression: '#em = :email',
        ExpressionAttributeNames:{
            '#em': 'email',
        },
        ExpressionAttributeValues: {
            ':email': req.body.email,
        }
    };
    doc.query(params, (err, data)=>  {
        if (err) {
            res.sendStatus(500);
        } else {
            let info = {};
            console.log('Query succeeded.');
            if(!_.isEmpty(data.Items) && data.Items.length == 1){
                data.Items.forEach(function(item) {
                    if(item.email == req.body.email && item.password == req.body.password){
                        info = item;
                    }
                });
            }
            if(_.isEmpty(info)){
                res.sendStatus(400);
            }else {
                res.json(info);
            }
        }
    });


});

module.exports = router;
