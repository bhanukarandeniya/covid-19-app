const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CovidIncident = sequelize.define('covid-incident',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: { type: DataTypes.DATE, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        discription: { type: DataTypes.STRING, allowNull: false }
    });
    return CovidIncident;
}