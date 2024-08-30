const express = require("express");
const router = express.Router();
const Machine = require("../models/Machine");
const MachineUnavailability = require("../models/MachineUnavailability");

router.post("/", async (req, res) => {
  try {
    const { product_capacity, employee_capacity, available } = req.body;
    const machine = await Machine.create({
      product_capacity,
      employee_capacity,
      available,
    });
    res.status(200).send(machine);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const machines = await Machine.findAll();
    res.status(200).send(machines);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findOne({ where: { id } });
    res.status(200).send(machine);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Machine.destroy({ where: { id } });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_capacity, employee_capacity, available } = req.body;
    await Machine.update(
      { product_capacity, employee_capacity, available },
      { where: { id } }
    );
    res.status(200).send(await Machine.findOne({ where: { id } }));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/unavailability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    for (const date of Object.keys(req.body)) {
      const { morning, noon, night } = req.body[date];
      const isDateExist = await MachineUnavailability.findOne({
        where: { date, machineId: id },
      });
      console.log({
        date,
        morning,
        noon,
        night,
        machineId: id,
      });
      if (isDateExist) {
        await MachineUnavailability.update(
          {
            morning,
            noon,
            night,
          },
          { where: { date, machineId: id } }
        );
      } else {
        await MachineUnavailability.create({
          date,
          morning,
          noon,
          night,
          machineId: id,
        });
      }
    }
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/unavailability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dates = await MachineUnavailability.findAll({
      where: { machineId: id },
    });
    const result = dates.reduce((acc, curr) => {
      acc[curr.date] = {
        morning: curr.morning,
        noon: curr.noon,
        night: curr.night,
      };
      return acc;
    }, {});
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
