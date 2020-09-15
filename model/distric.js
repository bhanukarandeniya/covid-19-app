const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Distric = sequelize.define('distric',{
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.SMALLINT, allowNull: false },
    });
    return Distric;
}