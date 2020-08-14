const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const doc = new AWS.DynamoDB.DocumentClient();

router.post('/view', (req, res) => {
    const params = {
        TableName: 'Cart',
        Select: 'ALL_ATTRIBUTES',
    };
    doc.scan(params, (err, data)=>  {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data.Items);
        }
    });
});
router.post('/add', (req, res) => {
    const paramsReg = {
        TableName: 'Order',
        Item: {
            email: req.body.email,
            id: uuidv4(),
            menuId:  req.body.menuId,
            modifications: req.body.modifications,
            date: _.now(),
            companyName: req.body.companyName
        },
    };
    doc.put(paramsReg, function(err, data) {
        if (err) { console.log(err);
            res.sendStatus(500);} // an error occurred
        else {
            res.sendStatus(200); // successful response
        }
    });
});
router.post('/delete', (req, res) => {
    const params = {
        TableName: 'Order',
        KeyConditionExpression: '#em = :email and #id = :id',
        ExpressionAttributeNames:{
            '#id': 'id',
            '#em': 'email',
        },
        ExpressionAttributeValues: {
            ':id': req.body.id,
            ':email': req.body.email,
        }
    };
    const paramsReg = {
        TableName: 'Order',
        Key: {
            email:  req.body.email,
            id: req.body.id
        },
    };
    doc.query(params, function(err, data){
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            let removable = false;
            data.Items.forEach(item =>{
                if( _.now() < item.date + 259200000){
                    removable = true;
                }
            });
            if(removable){
                doc.delete(paramsReg, function(err, data) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);} // an error occurred
                    else {
                        res.sendStatus(200); // successful response
                    }
                });
            } else {
                res.sendStatus(400); // an error occurred
            }
        }
    });
});
module.exports = router;
