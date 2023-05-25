const router = require("express").Router();
const validation = require("../middleware/validate");

const {
  getMusicByNameRoute,
  getMusicRoute,
  createMusicRoute,
  updateMusicRoute,
  deleteMusicRoute
} = require("../controllers/musics");

router.get("/", getMusicRoute);
router.get("/:musicId", getMusicByNameRoute);
router.post("/", validation.saveMusic, createMusicRoute);
router.put("/:musicId", validation.saveMusic, updateMusicRoute);
router.delete("/:musicId", deleteMusicRoute);

module.exports = router;
