const { CovidIncident } = require("../model/index");

/**
 * @swagger
 * /covid-incidents:
 *  post:
 *    description: Use to create covid incident
 *    responses:
 *      '200':
 *        description: A successful response
 */
const create = async (req, res) => {
    const covid_incident = {
        date: req.body.date,
        location: req.body.location,
        address: req.body.address,
        city: req.body.city,
        discription: req.body.discription,
        covid_district: req.body.covid_district
    }
    try {
        let data = await CovidIncident.create(covid_incident);
        if (data) {
            return res.status(200).send(data.dataValues);
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error saving covid incident..."
        });
    }
}

/**
 * @swagger
 * /all-covid-incidents:
 *  get:
 *    description: Use to request all covid incidents
 *    responses:
 *      '200':
 *        description: A successful response
 */
const findAll = async (req, res) => {
    const page = req.query.page;
    const limit = parseInt(req.query.size);
    const offset = page * limit;
    try {
        let data = await CovidIncident.findAll({
            limit: limit,
            offset: offset,
            where: { active_record: true }
        });
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Covid Incidents..."
        });
    }
};

/**
 * @swagger
 * /covid-incidents:
 *  get:
 *    description: Use to request one covid incident
 *    responses:
 *      '200':
 *        description: A successful response
 */
const findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await CovidIncident.findByPk(id);
        if (data != null && data != undefined) {
            return res.send(data);
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Covid Incident with id=" + id
        });
    }
    res.send(`No data available for the given id = ${id}`);
}

/**
 * @swagger
 * /covid-incidents:
 *  put:
 *    description: Use to update covid incident
 *    responses:
 *      '200':
 *        description: A successful response
 */
const update = async (req, res) => {
    const id = req.body.id;
    const covid_incident = getCovidIncident(req)
    try {
        let data = await CovidIncident.update(covid_incident, {
            where: { id: id }
        });
        if (data) {
            return res.send(data);
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Covid Incident with id=" + id
        });
    }
    res.send(`No data available for the given id = ${id}`);
};

/**
 * @swagger
 * /covid-incidents:
 *  put:
 *    description: Use to update covid incident
 *    responses:
 *      '200':
 *        description: A successful response
 */
const remove = async (req, res) => {
    const id = req.params.id;
    let success = `Succesfully deleted the record with id ${id}`;
    let fail = `Couldn't find the record with id ${id}`;
    try {
        let status = await CovidIncident.update({ active_record: false }, {
            where: {
                id: id,
                active_record: true
            }
        });
        return status == 1 ? res.status(200).send({ message: success }) : res.status(200).send({ message: fail });
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Covid Incidents..."
        });
    }

};

function getCovidIncident(req) {
    return {
        date: req.body.date,
        location: req.body.location,
        address: req.body.address,
        city: req.body.city,
        discription: req.body.discription,
        covid_district: req.body.covid_district
    };
}

module.exports = { create, findAll, findOne, update, remove }


