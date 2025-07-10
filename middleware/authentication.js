"use strict";
const Logger = require("../utils/logger");
const RequestHandler = require("../utils/RequestHandler");

const logger = new Logger();
const requestHandler = new RequestHandler(logger);
class Authentication {
   static async keyValidate(req, res, next) {
    try {
    const token = req.headers["x-access-token"];
      if (token == "1234567890") {
        next();
      } else {
        requestHandler.sendSuccess(
          res,
          "Forbidden! You have to get key!",
          401
        )();
      }
    } catch (error) {
      requestHandler.sendSuccess(res, "Forbidden! You have to get key!", 401)();
    }
  }
}

module.exports = Authentication;
