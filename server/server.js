const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const job = require("./app/jobs");
require("dotenv").config();
const cors = require("cors");

const Database = require("./database");
const database = new Database(process.env.DB_URI);

database
  .connect(process.env.DB_NAME)
  .then(() => console.log("Database connection successful"));

const app = require("./app");
const pass = require("./passport");

const server = express();

server.database = database;

server.use("/", express.static("media"));
server.use("/lib", express.static("node_modules"));
server.use(express.json());
server.use(express({ limit: "5mb" }));

server.use(app);
server.use(pass);

job.getTradersSchedule();
job.getIdeasSchedule();
job.getTransactionStatus(server.database);
job.updateCurrency(server.database);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server listening, port: " + PORT));
