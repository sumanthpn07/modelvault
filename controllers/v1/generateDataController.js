
const Joi = require("joi");
const RequestHandler = require("../../utils/RequestHandler");
const Logger = require("../../utils/logger");
const BaseController = require("../baseController");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class GenerateDataController extends BaseController {
  static async generateData(req, res) {
    // validation
    try{
        const {prompt} = req.body;
   
        requestHandler.sendSuccess(res, "Data Loaded Successfully")(prompt);

    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

}

module.exports = GenerateDataController;
