const express = require('express');
const router = express.Router();
const { create, findOne, findAll, update, remove } = require('../controller/covid-incident-controller');


router.get('/all', findAll);

router.get('/:id', findOne);

router.post('/', create);

router.put('/', update);

router.delete('/:id', remove);

module.exports = router;