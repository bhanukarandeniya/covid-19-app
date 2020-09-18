const express = require('express');
const router = express.Router();
const { create, findOne, findAll, update, remove } = require('../controller/covid-incident-controller');
const { paginationValidator, paramIdValidator } = require('../util/input-validator');

router.get('/all', paginationValidator, findAll);

router.get('/:id', paramIdValidator, findOne);

router.post('/', create);

router.put('/', update);

router.delete('/:id', paramIdValidator, remove);



module.exports = router;