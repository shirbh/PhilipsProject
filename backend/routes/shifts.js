const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const EmployeeUnavailability = require("../models/EmployeeUnavailability");
const Certification = require("../models/Certification");
const Product = require("../models/Product");
const Permission = require("..//models/Permission");
const Machine = require("../models/Machine");
const MachineUnavailability = require("../models/MachineUnavailability");

const MINIMUM_WORKER = 10;

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["priority", "DESC"]],
    });

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
        {
          model: EmployeeUnavailability,
          as: "employee_unavailabilities",
        },
      ],
    });

    const machines = await Machine.findAll({
      include: [
        {
          model: MachineUnavailability,
          as: "machine_unavailabilities",
        },
      ],
    });

    console.log("start");

    const shifts = {};
    const d = new Date();
    const times = ["morning", "noon", "night"];
    for (let day = 1; day <= 31; day++) {
      const date =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (day >= 10 ? day : "0" + day);
      const takenEmployeesIds = [];
      for (const time of times) {
        for (const machine of machines) {
          let schedueled = false;
          const machine_unavailable_dates =
            machine.machine_unavailabilities.map(
              (item) => `${item.date}:${item[time] ? "" : time}`
            );
          if (machine_unavailable_dates.includes(`${date}:${time}`)) {
            continue;
          }
          for (const product of products) {
            if (schedueled) {
              break;
            }
            const currEmployees = [];
            for (const employee of employees) {
              if (takenEmployeesIds.includes(employee.id)) {
                continue;
              }
              const unavailable_dates = employee.employee_unavailabilities.map(
                (item) => `${item.date}:${item[time] ? "" : time}`
              );
              if (unavailable_dates.includes(`${date}:${time}`)) {
                continue;
              }
              const certs = employee.certifications.map(
                (item) => item.certification_num
              );
              if (!certs.includes(product.id)) {
                continue;
              }

              currEmployees.push(employee);
              if (currEmployees.length >= MINIMUM_WORKER) {
                takenEmployeesIds.push(...currEmployees.map((item) => item.id));
                const newShift = {
                  employees: currEmployees,
                  time,
                  date,
                  product,
                };
                if (shifts[machine.id]) {
                  shifts[machine.id].push(newShift);
                } else {
                  shifts[machine.id] = [newShift];
                }
                schedueled = true;
                break;
              }
            }
          }
        }
      }
    }
    res.status(200).send(shifts);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findAll({
      order: [["priority", "DESC"]],
    });

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
        {
          model: EmployeeUnavailability,
          as: "employee_unavailabilities",
        },
      ],
    });

    const machines = await Machine.findAll({
      include: [
        {
          model: MachineUnavailability,
          as: "machine_unavailabilities",
        },
      ],
    });

    const shifts = {};
    const d = new Date();
    const times = ["morning", "noon", "night"];
    for (let day = 1; day <= 31; day++) {
      const date =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
        "-" +
        (day >= 10 ? day : "0" + day);
      const takenEmployeesIds = [];
      for (const time of times) {
        for (const machine of machines) {
          let schedueled = false;
          const machine_unavailable_dates =
            machine.machine_unavailabilities.map(
              (item) => `${item.date}:${item[time] ? "" : time}`
            );
          if (machine_unavailable_dates.includes(`${date}:${time}`)) {
            continue;
          }
          for (const product of products) {
            if (schedueled) {
              break;
            }
            const currEmployees = [];
            for (const employee of employees) {
              if (takenEmployeesIds.includes(employee.id)) {
                continue;
              }
              const unavailable_dates = employee.employee_unavailabilities.map(
                (item) => `${item.date}:${item[time] ? "" : time}`
              );
              if (unavailable_dates.includes(`${date}:${time}`)) {
                continue;
              }
              const certs = employee.certifications.map(
                (item) => item.certification_num
              );
              if (!certs.includes(product.id)) {
                continue;
              }

              currEmployees.push(employee);
              if (currEmployees.length >= MINIMUM_WORKER) {
                takenEmployeesIds.push(...currEmployees.map((item) => item.id));
                const newShift = {
                  employees: currEmployees,
                  machine: machine.id,
                  date,
                  product,
                  time,
                };
                shifts[`${date}:${time}`] = newShift;
                schedueled = true;
                continue;
              }
            }
          }
        }
      }
    }
    const result = {};
    for (const shift of Object.keys(shifts)) {
      const shiftData = shifts[shift];
      const employees = shiftData.employees.map((item) => item.id);
      if (employees.includes(Number(id))) {
        result[shiftData.date] = {
          machine: shiftData.machine,
          time: shiftData.time,
        };
      }
    }
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
