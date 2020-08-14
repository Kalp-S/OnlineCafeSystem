
//  PUT
const req = {
    body: {
        email: '12@gmail.com',
        password: '12345',
        name: 'John Doe',
        company: 'Amazon'
    }
};

const paramsReg = {
    TableName: 'Users',
    Item: {
        email: req.body.email,
        password:  req.body.password,
        name: req.body.name,
        company:req.body.company
        // attribute_value (string | number | boolean | null | Binary | DynamoDBSet | Array | Object)
        // more attributes...
    },
};

docClient.put(paramsReg, function(err, data) {
    if (err) res.sendStatus(500); // an error occurred
    else {
        ppJson(data); // successful response
        res.sendStatus(200);
    }
});
// Delete
var params = {
    TableName: 'Users'
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
var params = {
    TableName: 'Company'
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
var params = {
    TableName: 'Employee'
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
var params = {
    TableName: 'Menu'
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
var params = {
    TableName: 'Orders'
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});


//Query
const paramsCheckCompany = {
    TableName: 'Company',
    KeyConditionExpression: '#em = :name',
    ExpressionAttributeNames:{
        '#em': 'name',
    },
    ExpressionAttributeValues: {
        ':userName': req.body.companyName
    }
};
doc.query(paramsCheckCompany, (err, data)=>  {
    if (err) {
        res.sendStatus(500);
    } else {
        console.log(data);
    }
});
