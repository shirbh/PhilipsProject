const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class EmployeeUnavailability extends Model {}
EmployeeUnavailability.init(
  {
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      primaryKey: true,
    },
    morning: {
      type: DataTypes.BOOLEAN,
    },
    noon: {
      type: DataTypes.BOOLEAN,
    },
    night: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "employee_unavailabilities",
    timestamps: false,
  }
);

module.exports = EmployeeUnavailability;
