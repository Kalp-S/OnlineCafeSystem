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
        TableName: 'Menu',
        Select: 'ALL_ATTRIBUTES',
    };
    doc.scan(params, (err, data)=>  {
        if (err) {
            res.sendStatus(500);
        } else {
            console.log(data.Items);
            res.json(data.Items);
        }
    });
});
router.post('/add', (req, res) => {
    const paramsReg = {
        TableName: 'Menu',
        Item: {
            id:  uuidv4(),
            name: req.body.name,
            type: req.body.type,
            ingredients: req.body.ingredients,
            price: req.body.price,
            isAvailable: req.body.isAvailable
        },
    };
    doc.put(paramsReg, function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
          }
        else {
            res.sendStatus(200); // successful response
        }
    });
});
router.post('/update', (req, res) => {
  const params = {
      TableName:'Menu',
      Key:{
          'id': req.body.id,
          'name': req.body.name
      },
      UpdateExpression: 'set isAvailable = :ia',
      ExpressionAttributeValues:{
          ':ia': req.body.isAvailable,
      },
  };
  console.log(req.body)
    doc.update(params, function(err, data) {
        if (err) {
            console.log(err);
            res.sendStatus(500);} // an error occurred
        else {
            res.sendStatus(200); // successful response
        }
    });
});
module.exports = router;
