const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");
const Inventory = require("./inventory");

class Product extends Model {}
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "product",
    timestamps: false,
  }
);

Product.hasMany(Inventory);

module.exports = Product;
