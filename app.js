const express = require('express')
const { APP } = require('./config/config')
const router = require('./src/route/index')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./src/model/index')
const morgan = require('morgan')
const { fetchData } = require('./src/config/fetch-data')

var app = express()

// enable cors
app.use(cors(APP.cors_origin))

// enable requests of content-type - application/json
app.use(express.json())

// enable requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// enable request logging
app.use(morgan('dev'))

// enable HTTP header protection
app.use(helmet())

app.use('/', router)

db.sequelize.sync().then(() => {
  console.log('DB Connection established successfully...')
  fetchData()
}).catch(err => {
  console.log(err)
  process.exit(1)
})

app.listen(APP.port, () => {
  console.log('Sample app listening on port ' + APP.port + ' !')
})
