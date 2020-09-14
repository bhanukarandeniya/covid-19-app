var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(9000, () => {
    console.log('Sample app listening on port 9000!');
});