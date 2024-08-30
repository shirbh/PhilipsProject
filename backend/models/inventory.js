const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Inventory extends Model {}
Inventory.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "inventory",
    timestamps: false,
  }
);

module.exports = Inventory;
