const _ = require("lodash");

class RequestHandler {
  constructor(logger) {
    this.logger = logger;
  }

  throwIf(fn, status, errorType, errorMessage) {
    return (result) =>
      fn(result) ? this.throwError(status, errorType, errorMessage)() : result;
  }

  validateJoi(err, status, errorType, errorMessage) {
    if (err) {
      this.logger.log(`error in validating request : ${errorMessage}`, "warn");
    }
    return !_.isNull(err)
      ? this.throwError(status, errorType, errorMessage)()
      : "";
  }

  throwError(status, errorType, errorMessage) {
    return (e) => {
      if (!e) e = new Error(errorMessage || "Default Error");
      e.status = status;
      e.errorType = errorType;
      throw e;
    };
  }

  catchError(res, error) {
    if (!error) error = new Error("Default error");
    res.status(error.status || 500).json({
      type: "error",
      message: error.message || "Unhandled error",
      error,
    });
  }

  sendSuccess(res, message, status) {
    // console.log("yo", status);
    this.logger.log(
      `a request has been made and proccessed successfully at: ${new Date()}`,
      "info",
      `message: ${message}`
    );
    return (data, globalData) => {
      // console.log("heree", status);
      if (_.isUndefined(status)) {
        console.log("hi");
        status = 200;
      }
      console.log("yo", status);
      res.status(status).json({
        type: "success",
        message: message || "Success result",
        data,
        ...globalData,
      });
    };
  }

  sendWhatsappSuccess(res, message, status) {
    // console.log("yo..", message);
    this.logger.log(
      `a request has been made and proccessed successfully at: ${new Date()}`,
      "info",
      `message: ${message}, status: ${status != 200 ? status : 200}`
    );
    return (data, globalData) => {
      // console.log("heree", status);
      if (_.isUndefined(status)) {
        console.log("----svds-dfdd ");
        status = 200;
      }
      console.log("send response status", status);
      return res.status(status != 200 ? status : 200);
    };
  }

  sendError(req, res, error) {
    this.logger.log(
      `error ,Error during processing request: ${`${req.protocol}://${req.get(
        "host"
      )}${req.originalUrl}`} details message: ${error.message}`,
      "error"
    );
    return res.status(error.status || 500).json({
      type: "error",
      message: error.message || error.message || "Unhandled Error",
      error,
    });
  }
}
module.exports = RequestHandler;
