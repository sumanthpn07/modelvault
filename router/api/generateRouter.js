const router = require('express').Router();
const GenerateDataController = require('../../controllers/v1/generateDataController');
const Authentication = require('../../middleware/authentication');

const addSwaggerTag = (req,res,next)=>{
    // #swagger.tags = ['Data']
    // #swagger.description = 'Use this api for the first time to load the Data'
    next()
}
router.post(
    '/prompt', 
    addSwaggerTag,
    Authentication.keyValidate,
    GenerateDataController.generateData
);


module.exports = router;
