const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");

router.use("/", require("./swagger"));
router.use("/musics", ensureAuth, require("./musics"));
router.use("/users", ensureAuth, require("./users"));

module.exports = router;
