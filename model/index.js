const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        freezeTableName: true
    }
});

const db = {};
db.sequelize = sequelize;

db.Person = require('./person')(sequelize);
db.CovidIncident = require('./covid-incident')(sequelize);
db.Distric = require('./distric')(sequelize);

db.Distric.hasMany(db.Person, {
    foreignKey: 'person_distric'
});
db.Distric.hasMany(db.CovidIncident, {
    foreignKey: 'covid_distric'
});


module.exports = db
