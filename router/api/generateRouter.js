const router = require('express').Router();
const GenerateDataController = require('../../controllers/v1/generateDataController');
const Authentication = require('../../middleware/authentication');
const rateLimit = require('express-rate-limit');

const addSwaggerTag = (req,res,next)=>{
    // #swagger.tags = ['Data']
    // #swagger.description = 'Use this api for the first time to load the Data'
    next()
}

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});

router.post(
    '/prompt', 
    limiter,
    addSwaggerTag,
    // Authentication.keyValidate,
    GenerateDataController.generateData
);

router.post(
    '/prompt/withAuthentication', 
    limiter,
    addSwaggerTag,
    Authentication.keyValidate,
    GenerateDataController.generateData
);

module.exports = router;
