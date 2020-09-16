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
const findAll = (req, res) => {

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
const findOne = (req, res) => {
    const id = req.params.id;
    CovidIncident.findByPk(id)
        .then(data => {
            if (data != null && data != undefined) {
                res.send(data);
            }
            res.send(`No data available for the given id = ${id}`);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Covid Incident with id=" + id
            });
        });
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
const update = (req, res) => {

};

module.exports = { create, findAll, findOne, update }