const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const _ = require('lodash');
AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const doc = new AWS.DynamoDB.DocumentClient();

router.post('/employee/update', (req, res) => {
    const paramsUser = {
        TableName:'User',
        Key:{
            'email': req.body.email,
            'type':'Employee'
        },
        UpdateExpression: 'set firstName = :fn, lastName = :ln, cardNumber = :cn,expiryDate = :ed,cvcNumber = :cvn, password = :pw',
        ExpressionAttributeValues:{
            ':fn': req.body.firstName,
            ':ln': req.body.lastName,
            ':cn': req.body.cardNumber,
            ':ed': req.body.expiryDate,
            ':cvn': req.body.cvcNumber,
            ':pw': req.body.password,
        },
    };
    const paramsEmployee = {
        TableName:'Employee',
        Key:{
            'companyName': req.body.companyName,
            'email': req.body.email
        },
        UpdateExpression: 'set firstName = :fn, lastName = :ln',
        ExpressionAttributeValues:{
            ':fn': req.body.firstName,
            ':ln': req.body.lastName,
        },
    };

    doc.update(paramsUser, (err, data)=>  {
        if (err) {
            console.log(err);
            console.log('dasd');
            res.sendStatus(500);
        }else {
            doc.update(paramsEmployee, (err, data)=>  {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else {
                    res.json(data.Items); // successful response
                }
            });
        }
    });
});
router.post('/company/update', (req, res) => {
    var paramsUser = {
        TableName:'User',
        Key:{
            'name': req.body.email,
            'email': req.body.type
        },
        UpdateExpression: 'set firstName = :fn, lastName = :ln, paymentOption = :po, password = :pw',
        ExpressionAttributeValues:{
            ':fn': req.body.firstName,
            ':ln': req.body.lastName,
            ':po': req.body.paymentOption,
            ':pw': req.body.password,
        },
        ReturnValues:'ALL_OLD'
    };
    var paramsCompany = {
        TableName:'Company',
        Key:{
            'name': req.body.companyName,
            'email': req.body.email
        },
        UpdateExpression: 'set firstName = :fn, lastName = :ln',
        ExpressionAttributeValues:{
            ':fn': req.body.firstName,
            ':ln': req.body.lastName,
        },
    };

    doc.update(paramsUser, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }else {
            doc.update(paramsEmployee, (err, data)=>  {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else {
                    res.json(data.Items); // successful response
                }
            });
        }
    });
});

router.post('/caterer/update', (req, res) => {
    const paramsUser = {
        TableName:'User',
        Key:{
            'name': req.body.email,
            'email': req.body.type
        },
        UpdateExpression: 'set firstName = :fn, lastName = :ln, paymentOption = :po, password = :pw',
        ExpressionAttributeValues:{
            ':fn': req.body.firstName,
            ':ln': req.body.lastName,
            ':po': req.body.paymentOption,
            ':pw': req.body.password,
        },
        ReturnValues:'ALL_OLD'
    };
    const paramsEmployee = {
        TableName:'Employee',
        Key:{
            'companyName': req.body.companyName,
            'email': req.body.email
        },
        UpdateExpression: 'set firstName = :fn, lastName = :ln',
        ExpressionAttributeValues:{
            ':fn': req.body.firstName,
            ':ln': req.body.lastName,
        },
    };

    doc.update(paramsUser, (err, data)=>  {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }else {
            doc.update(paramsEmployee, (err, data)=>  {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }else {
                    res.json(data.Items); // successful response
                }
            });
        }
    });
});

router.post('/get', (req, res) => {
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
            res.json(data.Items[0]);
        }
    });
});

module.exports = router;
