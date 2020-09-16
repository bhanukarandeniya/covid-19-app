const Sequelize = require('sequelize');
const dbConfig = require('config').get('DB');

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
