const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    return Person.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: { type: DataTypes.STRING, allowNull: false },
        lastname: { type: DataTypes.STRING, allowNull: false },
        address1: { type: DataTypes.STRING, allowNull: false },
        address2: { type: DataTypes.STRING, allowNull: false },
        nic: { type: DataTypes.STRING(10), allowNull: true },
        city: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.DATE, allowNull: false },
        maritial_status: { type: DataTypes.BOOLEAN, allowNull: false },
        spouse: { type: DataTypes.STRING, allowNull: false },
        occupation: { type: DataTypes.STRING },
        infection_status: { type: DataTypes.ENUM, values: ['POSITIVE', 'NEGATIVE', 'PENDING'], allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        gender: { type: DataTypes.BOOLEAN, allowNull: false },
        contact_no: { type: DataTypes.STRING(10), allowNull: false },
        incident_id: { type: DataTypes.INTEGER, allowNull: false },
        active_record: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    }, {
        sequelize,
        modelName: 'person'
    });
}

class Person extends Model { }

