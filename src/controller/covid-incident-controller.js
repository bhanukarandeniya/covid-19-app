const { CovidIncident } = require("../model");

/**
 * @swagger
 * /covid-incidents:
 *  post:
 *    description: Use to create covid incident
 *    responses:
 *      '200':
 *        description: A successful response
 */
const create = (req, res) => {
    res.send('Hello World!');
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
            limit,
            offset,
            where: {}
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
const update = (req, res) => {

};

module.exports = { create, findAll, findOne, update }