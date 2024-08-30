const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Material extends Model {}
Material.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "material",
    timestamps: false,
  }
);

module.exports = Material;
