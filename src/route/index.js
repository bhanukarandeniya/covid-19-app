const express = require('express');
const router = express.Router();
const covidIncidentRouter = require('./covid-incident-route');
const personRouter = require('./person-route');


router.use('/covid-incidents', covidIncidentRouter)
router.use('/person', personRouter)

module.exports = router;