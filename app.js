const express = require('express');
require('dotenv').config();
const router = require('./src/route/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const db = require("./src/model/index");
const morgan = require('morgan')


var app = express();

// enable cors
app.use(cors(process.env.CORS_ORIGIN));

// enable requests of content-type - application/json
app.use(bodyParser.json());

// enable requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// enable request logging
app.use(morgan('dev'));

// enable HTTP header protection
app.use(helmet())

app.use('/', router);

db.sequelize.sync().then(() => {
    console.log('DB Connection established successfully...');
}).catch(err => {
    console.log(err);
});

app.listen(process.env.APP_PORT, () => {
    console.log('Sample app listening on port ' + process.env.APP_PORT + ' !');
});




