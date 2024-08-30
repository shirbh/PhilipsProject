// https://www.youtube.com/watch?v=bWFuEVmRgdk

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("db", "username", "password", {
  dialect: "sqlite",
  host: "./db.sqlite",
});

module.exports = sequelize;
