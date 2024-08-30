const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class MachineUnavailability extends Model {}
MachineUnavailability.init(
  {
    machineId: {
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
    modelName: "machine_unavailabilities",
    timestamps: false,
  }
);

module.exports = MachineUnavailability;
