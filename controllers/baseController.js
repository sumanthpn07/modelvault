const _ = require('lodash');
const RequestHandler = require('../utils/RequestHandler');
const Logger = require('../utils/logger');

const logger = new Logger();
const errHandler = new RequestHandler(logger);
class BaseController {
	
	constructor(options) {
		this.limit = 20;
		this.options = options;
	}
	
}
module.exports = BaseController;
