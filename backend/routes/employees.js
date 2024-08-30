const express = require("express");
const router = express.Router();
const { getDate, dateToYMD } = require("../getDate");
const Employee = require("../models/Employee");
const EmployeePassword = require("../models/EmployeePassword");
const EmployeeUnavailability = require("../models/EmployeeUnavailability");
const Certification = require("../models/Certification");
const Product = require("../models/Product");
const Permission = require("..//models/Permission");

router.post("/permissions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Permission.create({
      employeeId: id,
      date: dateToYMD(new Date()),
      edit: true,
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/permissions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Permission.destroy({
      where: { employeeId: id },
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (await Employee.findOne({ where: { email } })) {
      res.status(500).send("Email already exists.");
      return;
    }
    const employee = await Employee.create({ first_name, last_name, email });
    await EmployeePassword.create({
      employeeId: employee.id,
      password: String(password),
      password_date: getDate(),
    });
    res.status(200).send(employee);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    await Employee.update({ first_name, last_name, email }, { where: { id } });
    res.status(200).send(await Employee.findOne({ where: { id } }));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Employee.destroy({ where: { id } });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Certification,
          as: "certifications",
        },
        {
          model: Permission,
          as: "permissions",
        },
      ],
    });
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/certifications/:id", async (req, res) => {
  const { id } = req.params;
  const { certification_number } = req.body;
  try {
    const product = await Product.findOne({
      where: { id: certification_number },
    });
    if (!product) {
      res.status(404).send();
      return;
    }
    await Certification.create({
      employeeId: id,
      certification_num: certification_number,
      date: dateToYMD(new Date()),
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/certifications/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { certification_number } = req.body;
  try {
    await Certification.destroy({
      where: {
        employeeId: id,
        certification_num: certification_number,
      },
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/unavailability/:id", async (req, res) => {
  try {
    const { id } = req.params;
    for (const date of Object.keys(req.body)) {
      const { morning, noon, night } = req.body[date];
      const isDateExist = await EmployeeUnavailability.findOne({
        where: { date, employeeId: id },
      });
      if (isDateExist) {
        console.log({
          morning,
          noon,
          night,
          date,
          employeeId: id,
        });
        await EmployeeUnavailability.update(
          {
            morning,
            noon,
            night,
          },
          { where: { date, employeeId: id } }
        );
      } else {
        await EmployeeUnavailability.create({
          date,
          morning,
          noon,
          night,
          employeeId: id,
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
    const dates = await EmployeeUnavailability.findAll({
      where: { employeeId: id },
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
