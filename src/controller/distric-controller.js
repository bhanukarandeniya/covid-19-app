const { District } = require("../model/index");
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./config/messages.en', 'utf-8');

const findAll = async (req, res) => {
    try {
        let data = await District.findAll();
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({
            message: properties.get('database.error')
        });
    }
};


const create = async (req, res) => {
    const district = getDistrict(req.body)
    try {
        let data = await District.create(district);
        if (data) {
            return res.status(200).send(data.dataValues);
        }
    } catch (error) {
        return res.status(500).send({
            message: properties.get('database.error')
        });
    }

}

const getDistrict = (reqBody) => {
    return { name: reqBody.name, code: parseInt(reqBody.code) };
}

module.exports = { findAll, create }