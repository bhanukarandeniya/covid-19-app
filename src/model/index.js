const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    pool: {
        max: parseInt(process.env.DB_POOL_MAX),
        min: parseInt(process.env.DB_POOL_MIN),
        acquire: process.env.DB_POOL_ACQUIRE,
        idle: process.env.DB_POOL_IDLE
    },
    define: {
        freezeTableName: true
    }
});

const db = {};
db.sequelize = sequelize;

db.Person = require('./person')(sequelize);
db.CovidIncident = require('./covid-incident')(sequelize);
db.District = require('./district')(sequelize);

db.District.hasMany(db.Person, {
    foreignKey: 'person_district',
    allowNull: false
});
db.Person.belongsTo(db.District, {
    foreignKey: 'person_district',
    allowNull: false
});
db.District.hasMany(db.CovidIncident, {
    foreignKey: 'covid_district',
    allowNull: false
});
db.CovidIncident.belongsTo(db.District, {
    foreignKey: 'covid_district',
    allowNull: false
})

module.exports = db
