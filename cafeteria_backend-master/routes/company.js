const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const _ = require('lodash');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const doc = new AWS.DynamoDB.DocumentClient();
router.post('/view', (req, res) => {
    const params = {
        TableName: 'Employee',
        KeyConditionExpression: '#nm = :companyName',
        ExpressionAttributeNames:{
            '#nm': 'companyName'
        },
        ExpressionAttributeValues: {
            ':companyName': req.body.companyName
        }
    };
    doc.query(params, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }else {
            res.json(data.Items); // successful response
        }
    });
});
router.post('/add', (req, res) => {
    const paramsCheckEmployee = {
        TableName: 'Employee',
        KeyConditionExpression: '#cm = :name and #em = :email',
        ExpressionAttributeNames:{
            '#em': 'email',
            '#cm': 'companyName'
        },
        ExpressionAttributeValues: {
            ':email': req.body.email,
            ':name': req.body.companyName
        }
    };
    const paramsRegEmployee = {
        TableName: 'Employee',
        Item: {
            email: req.body.email,
            companyName: req.body.companyName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        },
    };
    doc.query(paramsCheckEmployee, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }else {
            if(!_.isEmpty(data.Items)){
                res.sendStatus(400);
            }else {
                doc.put(paramsRegEmployee, function(err) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);} // an error occurred
                    else {
                        res.sendStatus(200); // successful response
                    }
                });
            }
        }
    });
});

router.post('/delete', (req, res) => {
    const paramsDelEmployee = {
        TableName: 'Employee',
        Key: {
            'email': req.body.email,
            'companyName': req.body.companyName
        }
    };
    const paramsDelUser = {
        TableName: 'User',
        Key: {
            'email': req.body.email
        }
    };
    doc.delete(paramsDelEmployee, function(err) {
        if (err) {
            console.log(err);
            res.sendStatus(500);} // an error occurred
        else {
            doc.delete(paramsDelEmployee, function(err) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);} // an error occurred
                else {
                    res.sendStatus(200); // successful response
                }
            });                    }
    });
});

module.exports = router;
