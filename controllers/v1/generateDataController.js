
const Joi = require("joi");
const RequestHandler = require("../../utils/RequestHandler");
const Logger = require("../../utils/logger");
const BaseController = require("../baseController");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class GenerateDataController extends BaseController {
  static async generateData(req, res) {
    try {
        const Joi = require('joi');
        const schema = Joi.object({
            prompt: Joi.string().min(1).required()
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return requestHandler.sendError(req, res, error.details[0].message);
        }
        const { prompt } = req.body;
        // Stubbed response
        const response = `You said: ${prompt}`;

        // Logging
        const fs = require('fs');
        const path = require('path');
        const logDir = path.join(__dirname, '../../logs');
        const logFile = path.join(logDir, 'log.jsonl');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
        const logEntry = JSON.stringify({ prompt, response, timestamp: new Date().toISOString() }) + '\n';
        fs.appendFileSync(logFile, logEntry);

        requestHandler.sendSuccess(res, "Response generated successfully")({ response });
    } catch (error) {
        requestHandler.sendError(req, res, error);
    }
  }

}

module.exports = GenerateDataController;
