const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
} = require("../controllers/enrollmentController");

const { protect } = require("../middleware/authMiddleware");

// Student enrolls
router.post("/", protect, enrollCourse);

// View my enrollments
router.get("/me", protect, getMyEnrollments);

// Update progress
router.put("/:id/progress", protect, updateProgress);

module.exports = router;