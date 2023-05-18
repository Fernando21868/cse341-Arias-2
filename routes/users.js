const router = require("express").Router();

const {
  getUsersRoute,
  getUserByIdRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute
} = require("../controllers/users");

router.use("/", require("./swagger"));

router.get("/", getUsersRoute);
router.get("/:userId", getUserByIdRoute);
router.post("/", createUserRoute);
router.put("/:userId", updateUserRoute);
router.delete("/:userId", deleteUserRoute);

module.exports = router;
