const express = require("express");
const router = express.Router();
const { dateToYMD } = require("../getDate");
const Product = require("../models/Product");
const Material = require("../models/Material");
const Inventory = require("../models/inventory");
const { Sequelize, where } = require("sequelize");

router.post("/", async (req, res) => {
  try {
    const { priority } = req.body;
    const product = await Product.create({
      priority,
    });
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ where: { id } });
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.destroy({ where: { id } });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    await Product.update({ priority }, { where: { id } });
    res.status(200).send(await Product.findOne({ where: { id } }));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/materials/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const material = await Material.findOne({ where: { id } });
    if (material) {
      await Material.update(
        { quantity: material.quantity + 100000 },
        { where: { id } }
      );
    } else {
      await Material.create({ id, quantity: 100000 });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/inventory/materials/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const material = await Material.findOne({ where: { id } });
    if (material) {
      const { quantity } = material;
      const products = await Product.findAll();
      const quantityQuery = await Inventory.findAll({
        attributes: [
          "productId",
          (Sequelize.fn("sum", Sequelize.col("quantity")), "quantity"),
        ],
        group: ["productId"],
        raw: true,
      });

      const totalQuantites = quantityQuery.reduce((acc, curr) => {
        acc[curr.productId] = curr.quantity;
        return acc;
      }, {});

      const result = [];
      for (const product of products) {
        result.push({
          ...product.dataValues,
          producible_quantity: quantity,
          stock_quantity: totalQuantites[product.id],
        });
      }
      res.status(200).send(result);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/inventory/product/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const date = dateToYMD(new Date());
  try {
    const product = await Inventory.findOne({
      where: {
        productId: id,
        date,
      },
    });
    if (product) {
      await Inventory.update(
        {
          quantity: product.quantity + quantity,
        },
        { where: { productId: id } }
      );
    } else {
      await Inventory.create({
        productId: id,
        date,
        quantity,
      });
    }
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
