const { Person, District } = require('../model/index')
const { validate } = require('../util/input-validator')
const propertiesReader = require('properties-reader')
const properties = propertiesReader('./config/messages.en', 'utf-8')

/**
 * @swagger
 * /person:
 *  post:
 *    description: Use to create a person
 */
const create = async (req, res) => {
  validate(req, res)
  const person = getPerson(req.body)
  try {
    const data = await Person.create(person)
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
 * /person:
 *  put:
 *    description: Use to update a person
 */
const update = async (req, res) => {
  validate(req, res)
  const id = req.body.id
  const person = getPerson(req.body)
  try {
    const data = await Person.update(person, {
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
 * /person:
 *  get:
 *    description: Use to retrive a person
 */
const findOne = async (req, res) => {
  validate(req, res)
  const id = req.params.id
  try {
    const data = await Person.findByPk(id)
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
 * /person:
 *  get:
 *    description: Use to retrive all person
 */
const findAll = async (req, res) => {
  validate(req, res)
  const page = req.query.page
  const limit = parseInt(req.query.size)
  const offset = page * limit
  try {
    const data = await Person.findAll({
      limit: limit,
      offset: offset,
      where: { active_record: true },
      include: [District]
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
 * /person:
 *  delete:
 *    description: Use to retrive all person
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

function getPerson (reqBody) {
  return {
    firstname: reqBody.firstname,
    lastname: reqBody.lastname,
    address1: reqBody.address1,
    address2: reqBody.address2,
    nic: reqBody.nic,
    city: reqBody.city,
    dob: reqBody.dob,
    maritial_status: reqBody.maritial_status,
    spouse: reqBody.spouse,
    occupation: reqBody.occupation,
    infection_status: reqBody.infection_status,
    description: reqBody.description,
    person_district: reqBody.person_district,
    gender: reqBody.gender,
    incident_id: reqBody.incident_id
  }
}

module.exports = { create, update, findOne, findAll, remove }
