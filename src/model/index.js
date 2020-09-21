const Sequelize = require('sequelize');
const { DB } = require('../../config/config');

const sequelize = new Sequelize(DB.schema, DB.user, DB.password, {
    host: DB.host,
    dialect: DB.dialect,
    operatorsAliases: false,
    pool: {
        max: DB.pool.max,
        min: DB.pool.min,
        acquire: DB.pool.acquire,
        idle: DB.pool.idle
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
});

db.CovidIncident.hasMany(db.Person, {
    foreignKey: 'incident_id',
    allowNull: false
});

db.Person.belongsTo(db.CovidIncident, {
    foreignKey: 'incident_id',
    allowNull: false
});

module.exports = db
