const express = require("express");
const router = express.Router();
const { getDate } = require("../getDate");
const Login = require("../models/Login");
const Employee = require("../models/Employee");
const EmployeePassword = require("../models/EmployeePassword");
const Permission = require("../models/Permission");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({
    where: { email },
    include: [
      {
        model: EmployeePassword,
        as: "employee_password",
        where: { password },
      },
      {
        model: Permission,
        as: "permissions",
      },
    ],
  });
  if (!employee) {
    res.status(500).send("Wrong details");
    return;
  }
  const userLogin = {
    employeeId: employee.id,
    login_date: getDate(),
    password: String(password),
  };
  Login.create(userLogin)
    .then(() => {
      res.status(200).send(employee);
    })
    .catch((e) => res.status(500).send(e));
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({
      where: { email },
    });
    if (!employee) {
      res.status(404).send("Email doesn't exist in the system.");
      return;
    }
    await EmployeePassword.update(
      {
        password,
        password_date: getDate(),
      },
      { where: { employeeId: employee.id } }
    );
    res.status(200).send("Success.");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
