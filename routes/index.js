const router = require("express").Router();

// router.use("/", require("./swagger"));
router.use("/musics", require("./musics"));
router.use("/users", require("./users"));

module.exports = router;
