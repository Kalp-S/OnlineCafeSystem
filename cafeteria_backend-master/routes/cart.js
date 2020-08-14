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

router.post('/user/view', (req, res) => {
    const params = {
        TableName: 'Cart',
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
            res.json(data.Items);
        }
    });
});
router.post('/caterer/view', (req, res) => {
    const params = {
        TableName: 'Cart',
        Select: 'ALL_ATTRIBUTES',
    };
    doc.query(params, (err, data)=>  {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data.Items);
        }
    });
});
router.post('/add', (req, res) => {
    const paramsReg = {
        TableName: 'Cart',
        Item: {
            email: req.body.email,
            id: uuidv4(),
            menuId:  req.body.menuId,
            modifications: req.body.modifications,
            month: req.body.month,
            day: req.body.day,
            companyName: req.body.companyName,
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
router.post('/remove', (req, res) => {
    const paramsReg = {
        TableName: 'Cart',
        Key: {
            email:  req.body.email,
            id: req.body.id
        },
    };
    doc.delete(paramsReg, function(err, data) {
        if (err) { console.log(err);
            res.sendStatus(500);} // an error occurred
        else {
            res.sendStatus(200); // successful response
        }
    });
});
module.exports = router;
