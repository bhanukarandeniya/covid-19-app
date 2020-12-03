const { CovidIncident, District } = require('../model/index')
const { validate } = require('../util/input-validator')
const propertiesReader = require('properties-reader')
const properties = propertiesReader('./config/messages.en', 'utf-8')

/**
 * @swagger
 * /covid-incidents:
 *  post:
 *    description: Use to create a Covid incident
 */
const create = async (req, res) => {
  validate(req, res)
  const covid_incident = getCovidIncidentObj(req.body)
  try {
    const data = await CovidIncident.create(covid_incident)
    if (data) {
      return res.status(200).send(data.dataValues)
    }
  } catch (error) {
    return res.status(500).send({
      message: properties.get('database.error')
    })
  }
}

/**
 * @swagger
 * /all-covid-incidents:
 *  get:
 *    description: Use to request all Covid incidents
 */
const findAll = async (req, res) => {
  validate(req, res)
  const page = req.query.page
  const limit = parseInt(req.query.size)
  const offset = page * limit
  try {
    const data = await CovidIncident.findAll({
      limit: limit,
      offset: offset,
      where: { active_record: true },
      include: [District] // Left outer join
    })
    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).send({
      message: properties.get('database.error')
    })
  }
}

/**
 * @swagger
 * /covid-incidents:
 *  get:
 *    description: Use to retrive a Covid incident
 */
const findOne = async (req, res) => {
  validate(req, res)
  const id = req.params.id
  try {
    const data = await CovidIncident.findByPk(id)
    if (data != null && data != undefined) {
      return res.status(200).send(data)
    }
  } catch (error) {
    return res.status(500).send({
      message: properties.get('database.error')
    })
  }
  res.status(200).send(properties.get('database.info.id-not-found') + ' ' + id)
}

/**
 * @swagger
 * /covid-incidents:
 *  put:
 *    description: Use to remove Covid incident
 */
const update = async (req, res) => {
  validate(req, res)
  const id = req.body.id
  const covid_incident = getCovidIncidentObj(req.body)
  try {
    const data = await CovidIncident.update(covid_incident, {
      where: { id: id }
    })
    if (data) {
      return res.status(200).send(data)
    }
  } catch (error) {
    return res.status(500).send({
      message: properties.get('database.error')
    })
  }
  res.status(200).send(properties.get('database.info.id-not-found') + ' ' + id)
}

/**
 * @swagger
 * /covid-incidents:
 *  delete:
 *    description: Use to remove Covid incident
 */
const remove = async (req, res) => {
  validate(req, res)
  const id = req.params.id
  const success = properties.get('database.success.record-deleted') + ' ' + id
  const fail = properties.get('database.info.id-not-found') + ' ' + id
  try {
    const status = await CovidIncident.update({ active_record: false }, {
      where: {
        id: id,
        active_record: true
      }
    })
    return status == 1 ? res.status(200).send({ message: success }) : res.status(200).send({ message: fail })
  } catch (error) {
    return res.status(500).send({
      message: properties.get('database.error')
    })
  }
}

const getCovidIncidentObj = (reqBody) => {
  return {
    date: reqBody.date,
    location: reqBody.location,
    address: reqBody.address,
    city: reqBody.city,
    description: reqBody.description,
    covid_district: reqBody.covid_district
  }
}

module.exports = { create, findAll, findOne, update, remove }
