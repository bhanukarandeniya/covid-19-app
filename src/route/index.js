const express = require('express');
const router = express.Router();
const covidIncidentRouter = require('./covid-incident-route');
const personRouter = require('./person-route');
const districtRouter = require('./distric-route');


router.use('/covid-incidents', covidIncidentRouter);
router.use('/person', personRouter);
router.use('/districts', districtRouter);

module.exports = router;