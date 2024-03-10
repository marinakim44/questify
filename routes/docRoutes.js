const express = require("express");
const router = express.Router();
const {
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} = require("../controllers/docController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDocs);
router.route("/:id").get(protect, getDoc);
router.route("/add").post(protect, addDoc);
router.route("/delete/:id").delete(protect, deleteDoc);
router.route("/update/:id").put(protect, updateDoc);

module.exports = router;
