const express = require('express');
const router = express.Router();
const { create, findOne, findAll, update, remove } = require('../controller/covid-incident-controller');
const personController = require('../controller/person-controller');



router.get('/covid-incidents/:id', findOne);

router.get('/all-covid-incidents', findAll);

router.post('/covid-incidents', create);

router.put('/covid-incidents', update);

router.delete('/covid-incidents/:id', remove);

module.exports = router;