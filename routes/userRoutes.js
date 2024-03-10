const express = require("express");
const router = express.Router();
const {
  loginUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

router.post("/google-auth", loginUser);
router.get("/user", getUser);
router.get("/get-users", getUsers);

module.exports = router;
