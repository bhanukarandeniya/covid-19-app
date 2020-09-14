var express = require('express');
const db = require("./model/index");

var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

db.sequelize.sync({ force: true }).then(result => {
    // console.log(result);
}).catch(err => {
    console.log(err);
});

app.listen(9000, () => {
    console.log('Sample app listening on port 9000!');
});