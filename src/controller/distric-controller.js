const { District } = require("../model");

const findAll = async (req, res) => {
    try {
        let data = await District.findAll();
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Covid Incidents..."
        });
    }
};

module.exports = { findAll }