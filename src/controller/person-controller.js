const { Person, District } = require("../model");


const create = async (req, res) => {
    const person = getPerson(req.body)
    try {
        let data = await Person.create(person);
        if (data) {
            return res.status(200).send(data.dataValues);
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error saving person..."
        });
    }

}


const update = async (req, res) => {
    const id = req.body.id;
    const person = getPerson(req.body)
    try {
        let data = await Person.update(person, {
            where: { id: id }
        });
        if (data) {
            return res.status(200).send(data);
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Covid Incident with id=" + id
        });
    }
    res.send(`No data available for the given id = ${id}`);
}


const findOne = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await Person.findByPk(id);
        if (data != null && data != undefined) {
            return res.status(200).send(data);
        }
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving person with id=" + id
        });
    }
    res.send(`No data available for the given id = ${id}`);
}



const findAll = async (req, res) => {
    const page = req.query.page;
    const limit = parseInt(req.query.size);
    const offset = page * limit;
    try {
        let data = await Person.findAll({
            limit: limit,
            offset: offset,
            where: { active_record: true },
            include: [District]
        });
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving person..."
        });
    }
}

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
            message: "Error retrieving person..."
        });
    }

}

function getPerson(reqBody) {
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
        person_district: reqBody.person_district
    };
}


module.exports = { create, update, findOne, findAll, remove }


