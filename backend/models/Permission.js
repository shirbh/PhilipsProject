const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Permission extends Model {}
Permission.init(
  {
    employeeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    edit: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: "permission",
    timestamps: false,
  }
);

module.exports = Permission;
