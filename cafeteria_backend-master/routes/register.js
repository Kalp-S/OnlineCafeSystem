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
router.post('/company', (req, res) => {
    const params = {
        TableName: 'Company',
        KeyConditionExpression: '#nm = :name and #em = :email',
        ExpressionAttributeNames:{
            '#nm': 'name',
            '#em': 'email',
        },
        ExpressionAttributeValues: {
            ':name': req.body.companyName,
            ':email': req.body.email,
        }
    };
    const paramsRegComp = {
        TableName: 'Company',
        Item: {
            name: req.body.companyName,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            postalCode:req.body.postalCode,
            contactName:req.body.contactName,
            phone:req.body.phone,
            password:req.body.password,
        },
    };
    const paramsRegUser = {
        TableName: 'User',
        Item: {
            email: req.body.email,
            type: 'Company',
            password:  req.body.password,
            firstName: req.body.contactName,
            lastName: req.body.contactName,
            companyName: req.body.companyName,
            phone:req.body.phone,
        },
    };
    doc.query(params, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            console.log('Query succeeded.');
            if(!_.isEmpty(data.Items)){
                res.sendStatus(400);
            }else{
                doc.put(paramsRegComp, function(err) {
                    if (err) res.sendStatus(500); // an error occurred
                    else {
                        doc.put(paramsRegUser, function(err) {
                            if (err) res.sendStatus(500); // an error occurred
                            else {
                                res.sendStatus(200);
                            }
                        });
                    }
                });
            }
        }
    });

});
router.post('/employee', (req, res) => {
    const paramsCheckEmail = {
        TableName: 'User',
        KeyConditionExpression: '#em = :email',
        ExpressionAttributeNames:{
            '#em': 'email',
        },
        ExpressionAttributeValues: {
            ':email': req.body.email
        }
    };
    const paramsCheckEmployee = {
        TableName: 'Employee',
        KeyConditionExpression: '#em = :email and #nm = :companyName',
        ExpressionAttributeNames:{
            '#em': 'email',
            '#nm': 'companyName',
        },
        ExpressionAttributeValues: {
            ':email': req.body.email,
            ':companyName': req.body.companyName
        }
    };
    const paramsRegUser = {
        TableName: 'User',
        Item: {
            email: req.body.email,
            type: 'Employee',
            password:  req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            companyName: req.body.companyName,
        },
    };

    doc.query(paramsCheckEmployee, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            if(_.isEmpty(data.Items)){
                console.log('Employee Check Error');
                res.sendStatus(400);
            } else {
                doc.query(paramsCheckEmail, (err, data)=>  {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        if(!_.isEmpty(data.Items)){
                            res.sendStatus(400);
                        } else {
                            doc.put(paramsRegUser, function(err) {
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
            }
        }
    });

});
router.post('/caterer', (req, res) => {
    const paramsCheckEmail = {
        TableName: 'User',
        KeyConditionExpression: '#em = :email',
        ExpressionAttributeNames:{
            '#em': 'email',
        },
        ExpressionAttributeValues: {
            ':email': req.body.email
        }
    };
    const paramsRegUser = {
        TableName: 'User',
        Item: {
            email: req.body.email,
            type: 'Caterer',
            password:  req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
    };

    doc.query(paramsCheckEmail, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            if(!_.isEmpty(data.Items)){
                res.sendStatus(400);
            } else {
                doc.put(paramsRegUser, function(err) {
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

module.exports = router;
