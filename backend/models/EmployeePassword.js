const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class EmployeePassword extends Model {}
EmployeePassword.init(
  {
    password_date: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    password: {
      type: DataTypes.CHAR(20),
    },
  },
  {
    sequelize,
    modelName: "employee_password",
    timestamps: false,
  }
);

module.exports = EmployeePassword;
