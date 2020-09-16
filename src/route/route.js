const express = require('express');
const router = express.Router();
const { create, findOne, findAll, update } = require('../controller/covid-incident-controller');
const personController = require('../controller/person-controller');



router.get('/covid-incidents/:id', findOne);

router.get('/all-covid-incidents', findAll);

router.post('/covid-incidents', create);

router.put('/covid-incidents/:id', update);

module.exports = router;