const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const uuid = require("uuid");
const config = require("../config/appconfig");
const Logger = require("../utils/logger.js");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../utils/swagger_output.json");
const fileUpload = require("express-fileupload");
const logger = new Logger();
const app = express();
app.set("config", config); // the system configrations

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.use(
  fileUpload({
    createParentPath: true,
    parseNested: true,
  })
);

const swagger = require("../utils/swagger");


process.on("SIGINT", () => {
  logger.log("stopping the server", "info");
  process.exit();
});

app.set("port", process.env.DEV_APP_PORT);
app.use("/api/docs", swagger.router);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res, next) => {
  req.identifier = uuid();
  const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url}`;
  logger.log(logString, "info");
  next();
});

app.use("/api", require("../router"));
app.use("/", function (req, res) {
  res.send("working wel");
});

app.use((req, res, next) => {
  logger.log(
    "The url you are trying to reach is not hosted on our server",
    "error"
  );
  const err = new Error("Not Found");
  err.status = 404;
  res.status(err.status).json({
    type: "error",
    message: "The url you are trying to reach is not hosted on our server",
  });
  next(err);
});

module.exports = app;
