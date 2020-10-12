const express = require('express')
const router = express.Router()
const covidIncidentRouter = require('./covid-incident-route')
const personRouter = require('./person-route')
const districtRouter = require('./distric-route')
const { testApp } = require('../controller/test-controller')
const { swaggerUi, swaggerCovidDoc, swaggerPersonDoc } = require('../config/swagger-config')

// enable swagger UI docs
router.use('/api-docs/covid-incidents', swaggerUi.serve, swaggerUi.setup(swaggerCovidDoc))
router.use('/api-docs/person', swaggerUi.serve, swaggerUi.setup(swaggerPersonDoc))

// Routing to controllers
router.use('/covid-incidents', covidIncidentRouter)
router.use('/person', personRouter)
router.use('/districts', districtRouter)

// Application Server Test
router.get('/test', testApp)

module.exports = router
