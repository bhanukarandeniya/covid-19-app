const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return CovidIncident.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    discription: { type: DataTypes.TEXT, allowNull: false },
    active_record: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
  }, {
    sequelize,
    modelName: 'covid_incident'
  })
}

class CovidIncident extends Model { }
