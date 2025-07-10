const router = require('express').Router();
const AuthenticateController = require('../../controllers/v1/authenticateController');

const addSwaggerTag = (req,res,next)=>{
    // #swagger.tags = ['Authenticates']
    // #swagger.description = 'Use this api for the first time to load the Data'
    next()
}
router.post(
    '/', 
    addSwaggerTag, 
    AuthenticateController.authenticate
);


module.exports = router;