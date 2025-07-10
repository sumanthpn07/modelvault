const router = require("express").Router();

router.use("/api", require("./api"));

// router.use("/", function (req, res) {
//   // res.send("logipe");
// });

module.exports = router;
