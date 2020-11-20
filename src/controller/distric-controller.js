const { District } = require('../model/index')
const propertiesReader = require('properties-reader')
const properties = propertiesReader('./config/messages.en', 'utf-8')
const redis = require('redis')
const { CACHE } = require('../../config/config')

// Redis cache implementation
const client = redis.createClient({
  port: CACHE.port,
  host: CACHE.host
})

const findAll = async (req, res) => {
  client.get('*', async (err, cache) => {
    if (cache) {
      console.log('Hitting the Redis cache...')
      return res.status(200).send(JSON.parse(cache))
    }
    try {
      console.log('Hitting the DB Server...')
      const data = await District.findAll()
      // Push db records to Redis cache with key *
      client.set('*', JSON.stringify(data))
      return res.status(200).send(data)
    } catch (error) {
      console.error(error)
      return res.status(500).send({
        message: properties.get('database.error')
      })
    }
  })
}

const create = async (req, res) => {
  const district = getDistrict(req.body)
  try {
    const data = await District.create(district)
    if (data) {
      // Flush Cache if new record inserted
      client.flushall()
      return res.status(200).send(data.dataValues)
    }
  } catch (error) {
    return res.status(500).send({
      message: properties.get('database.error')
    })
  }
}

const getDistrict = (reqBody) => {
  return { name: reqBody.name, code: parseInt(reqBody.code) }
}

module.exports = { findAll, create }
