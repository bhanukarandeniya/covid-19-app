const express = require('express');
const config = require('config').get('app');
const corsConfig = require('config').get('CORS');
const router = require('./src/route/route');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./src/model/index");
const morgan=require('morgan')
const { swaggerUi, swaggerDocs } = require('./src/config/swagger-config');


var app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsConfig.origin));

// enable requests of content-type - application/json
app.use(bodyParser.json());

// enable requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('combined'));

app.use("", router);

db.sequelize.sync().then(result => {
    // console.log(result);
}).catch(err => {
    console.log(err);
});

app.listen(config.port, () => {
    console.log('Sample app listening on port 9000!');
});




