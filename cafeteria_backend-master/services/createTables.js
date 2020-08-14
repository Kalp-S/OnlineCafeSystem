const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://localhost:8000'
});
const dynamodb = new AWS.DynamoDB();
const createTable = {
    user: () =>{
        const userTable = {
            TableName : 'User',
            KeySchema: [
                { AttributeName: 'email', KeyType: 'HASH'},
                { AttributeName: 'type', KeyType: 'RANGE'},  //Partition key

            ],
            AttributeDefinitions: [
                { AttributeName: 'email', AttributeType: 'S' },
                { AttributeName: 'type', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table Users. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
    company: () =>{
        const userTable = {
            TableName : 'Company',
            KeySchema: [
              { AttributeName: 'name', KeyType: 'HASH'},
              { AttributeName: 'email', KeyType: 'RANGE'},
            ],
            AttributeDefinitions: [
              { AttributeName: 'name', AttributeType: 'S' },
              { AttributeName: 'email', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table Company. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
    employee: () =>{
        const userTable = {
            TableName : 'Employee',
            KeySchema: [
              { AttributeName: 'companyName', KeyType: 'HASH'},
              { AttributeName: 'email', KeyType: 'RANGE'},
            ],
            AttributeDefinitions: [
              { AttributeName: 'companyName', AttributeType: 'S' },
              { AttributeName: 'email', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table Company. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
    menu: () =>{
        const userTable = {
            TableName : 'Menu',
            KeySchema: [
              { AttributeName: 'id', KeyType: 'HASH'},
              { AttributeName: 'name', KeyType: 'RANGE'},
            ],
            AttributeDefinitions: [
              { AttributeName: 'id', AttributeType: 'S' },
              { AttributeName: 'name', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table Menu. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
    orders: () =>{
        const userTable = {
            TableName : 'Order',
            KeySchema: [
              { AttributeName: 'email', KeyType: 'HASH'},
              { AttributeName: 'id', KeyType: 'RANGE'},


            ],
            AttributeDefinitions: [
              { AttributeName: 'email', AttributeType: 'S' },
              { AttributeName: 'id', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table Orders. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
    cart: () =>{
        const userTable = {
            TableName : 'Cart',
            KeySchema: [
              { AttributeName: 'email', KeyType: 'HASH'},
              { AttributeName: 'id', KeyType: 'RANGE'},
            ],
            AttributeDefinitions: [
              { AttributeName: 'email', AttributeType: 'S' },
              { AttributeName: 'id', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(userTable, (err, data) => {
            if (err) {
                console.error('Unable to create table Orders. Error JSON:', JSON.stringify(err, null, 2));
            } else {
                console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
            }
        });

    },
};

module.exports = createTable;
