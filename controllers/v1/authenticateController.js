
const Joi = require("joi");
const RequestHandler = require("../../utils/RequestHandler");
const Logger = require("../../utils/logger");
const BaseController = require("../baseController");
const logger = new Logger();
const requestHandler = new RequestHandler(logger);

class AuthenticateController extends BaseController {
  static async authenticate(req, res) {
    // validation
    try{
        const {email,password} = req.body;
        // email should be equal to "admin@gmail.com" and password should be equal to "admin"
        if(email !== "admin@gmail.com" || password !== "admin"){
            return requestHandler.sendError(req, res, "Invalid email or password");
        }
        const token = "1234567890";
        // here i can use jwt token to authenticate the user
        // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //     if(err){
        //         return requestHandler.sendError(req, res, "Invalid token");
        //     }
        //     req.user = decoded;
        // });
        requestHandler.sendSuccess(res, "Data Loaded Successfully")(token);

    } catch (error) {
      requestHandler.sendError(req, res, error);
    }
  }

}

module.exports = AuthenticateController;
