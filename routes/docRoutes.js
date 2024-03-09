const express = require("express");
const router = express.Router();
const {
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} = require("../controllers/docController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDocs);
router.route("/add").post(protect, addDoc);
router.route("/:id").put(protect, updateDoc).delete(protect, deleteDoc);

module.exports = router;
