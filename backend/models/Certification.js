const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Certification extends Model {}
Certification.init(
  {
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    certification_num: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "certification",
    timestamps: false,
  }
);

module.exports = Certification;
