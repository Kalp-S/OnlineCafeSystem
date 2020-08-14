const express = require('express');
const bodyParser = require('body-parser');
const createTable = require('./services/createTables');
const app = express();
const port = 3001;


app.use(bodyParser.json());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.listen(port, () =>{
    createTable.user();
    createTable.company();
    createTable.employee();
    createTable.menu();
    createTable.orders();
    createTable.cart();
    console.log(`Example app listening on port ${port}!`);
});
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/company', require('./routes/company'));
app.use('/menu', require('./routes/menu'));
app.use('/orders', require('./routes/orders'));
app.use('/cart', require('./routes/cart'));
app.use('/settings', require('./routes/settings'));
