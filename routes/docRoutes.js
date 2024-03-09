const express = require("express");
const router = express.Router();
const {
  getDocs,
  setDocs,
  updateDoc,
  deleteDoc,
} = require("../controllers/docController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDocs).post(protect, setDocs);
router.route("/:id").put(protect, updateDoc).delete(protect, deleteDoc);

module.exports = router;
