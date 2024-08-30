const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Login extends Model {}
Login.init(
  {
    login_date: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    password: {
      type: DataTypes.CHAR(20),
    },
  },
  {
    sequelize,
    modelName: "login",
    timestamps: false,
  }
);

module.exports = Login;
