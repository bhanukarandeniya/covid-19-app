const express = require('express');
const router = express.Router();
const { findAll } = require('../controller/distric-controller');

router.get('/', findAll);

module.exports = router;