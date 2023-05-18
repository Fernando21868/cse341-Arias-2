const router = require("express").Router();

const {
  getMusicByNameRoute,
  getMusicRoute,
  createMusicRoute,
  updateMusicRoute,
  deleteMusicRoute
} = require("../controllers/musics");

router.use("/", require("./swagger"));

router.get("/", getMusicRoute);
router.get("/:musicId", getMusicByNameRoute);
router.post("/", createMusicRoute);
router.put("/:musicId", updateMusicRoute);
router.delete("/:musicId", deleteMusicRoute);

module.exports = router;
