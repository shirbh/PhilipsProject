const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const MachineUnavailability = require("./MachineUnavailability");

class Machine extends Model {}
Machine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_capacity: {
      type: DataTypes.INTEGER,
    },
    employee_capacity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "machine",
    timestamps: false,
  }
);

Machine.hasMany(MachineUnavailability);

module.exports = Machine;
