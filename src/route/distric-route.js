const express = require('express')
const router = express.Router()
const { findAll, create } = require('../controller/distric-controller')

router.get('/', findAll)

router.post('/', create)

module.exports = router
