const { District } = require("../model/index");
const propertiesReader = require('properties-reader');
const properties = propertiesReader('./config/messages.en', 'utf-8');
const redis = require('redis');

//Redis cache implementation
const client = redis.createClient(6379);

const findAll = async (req, res) => {
    client.get("*", async (err, cache) => {
        if (cache) {
            console.log('Hitting the Redis cache...');
            return res.status(200).send(JSON.parse(cache));
        }
        try {
            console.log('Hitting the DB Server...');
            let data = await District.findAll();
            //Push db records to Redis cache with key *
            client.set("*", 1000, JSON.stringify(data));
            return res.status(200).send(data);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: properties.get('database.error')
            });
        }
    })
};


const create = async (req, res) => {
    const district = getDistrict(req.body)
    try {
        let data = await District.create(district);
        if (data) {
            //Flush Cache if new record inserted
            client.flushall();
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