const { DataTypes, Model } = require('sequelize')

module.exports = (sequelize) => {
  return District.init({
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING(15), allowNull: false }
  }, {
    sequelize,
    modelName: 'district'
  })
}

class District extends Model { }
