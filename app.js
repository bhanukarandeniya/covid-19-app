var express = require('express');
const config = require('config').get('app');
const db = require("./src/model/index");
const { swaggerUi, swaggerDocs } = require('./src/config/swagger-config');


var app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * /covid:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/covid', (req, res) => {
    res.send('Hello World!');
})

db.sequelize.sync().then(result => {
    // console.log(result);
}).catch(err => {
    console.log(err);
});

app.listen(config.port, () => {
    console.log('Sample app listening on port 9000!');
});




