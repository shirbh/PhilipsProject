const express = require("express");
const sequelize = require("./database");
const cors = require("cors");
const jwt = require("jsonwebtoken");

sequelize.sync().then(() => console.log("Database is ready"));

const server = express();
server.use(express.json());
server.use(cors());

// routes
server.use("/employees", require("./routes/employees"));
server.use("/machines", require("./routes/machines"));
server.use("/auth", require("./routes/auth"));
server.use("/products", require("./routes/products"));
server.use("/shifts", require("./routes/shifts"));

server.listen(3003, () => {
  console.log(`Server running at port ${3003}`);
});
