const router = require("express").Router();
const validation = require("../middleware/validate");

const {
  getUsersRoute,
  getUserByIdRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute
} = require("../controllers/users");

router.get("/", getUsersRoute);
router.get("/:userId", getUserByIdRoute);
router.post("/", validation.saveUser, createUserRoute);
router.put("/:userId", validation.saveUser, updateUserRoute);
router.delete("/:userId", deleteUserRoute);

module.exports = router;
