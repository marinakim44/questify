const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/google-auth", loginUser);
router.get("/user", getUser);

module.exports = router;
