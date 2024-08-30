const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const EmployeePassword = require("./EmployeePassword");
const Login = require("./Login");
const EmployeeUnavailability = require("./EmployeeUnavailability");
const Permission = require("./Permission");
const Certification = require("./Certification");

class Employee extends Model {}
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.CHAR(20),
    },
    last_name: {
      type: DataTypes.CHAR(20),
    },
    email: {
      type: DataTypes.CHAR(50),
    },
  },
  {
    sequelize,
    modelName: "employee",
    timestamps: false,
  }
);

Employee.hasOne(EmployeePassword);
Employee.hasMany(Login);
Employee.hasMany(Permission);
Employee.hasMany(Certification);
Employee.hasMany(EmployeeUnavailability);

module.exports = Employee;
