const { Model, DataTypes } = require('sequelize');



module.exports = (sequelize, Sequelize) =>
    Person.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: { type: Sequelize.STRING, allowNull: false },
        lastname: { type: Sequelize.STRING, allowNull: false },
        address1: { type: Sequelize.STRING, allowNull: false },
        address2: { type: Sequelize.STRING, allowNull: false },
        city: { type: Sequelize.STRING, allowNull: false },
        district: { type: Sequelize.STRING, allowNull: false },
        dob: { type: Sequelize.DATE, allowNull: false },
        maritial_status: { type: Sequelize.BOOLEAN, allowNull: false },
        spouse: { type: Sequelize.STRING, allowNull: false },
        occupation: { type: Sequelize.STRING },
        infection_status: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: false }
    }, {
        sequelize,
        modelName: 'person'
    });

class Person extends Model { }



