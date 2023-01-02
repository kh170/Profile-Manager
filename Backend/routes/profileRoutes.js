const express = require("express");
const {
  getProfile,
  createProfile,
  getProfileByID,
  updateProfile,
  deleteProfile,
  //   updateProfile,
} = require("../controllers/profileController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getProfile);
router.route("/create").post(protect, createProfile);
router
  .route("/:id")
  .get(getProfileByID)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

module.exports = router;
