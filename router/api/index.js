const router = require("express").Router();

router.use("/authenticate", require("./authenticatorRouter.js"));
router.use("/generate", require("./generateRouter.js"));

module.exports = router;
