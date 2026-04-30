const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
} = require("../controllers/courseController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Instructor/Admin can create
router.post("/", protect, authorizeRoles("instructor", "admin"), createCourse);

// Public can view all
router.get("/", getCourses);

// Public can view one
router.get("/:id", getCourseById);

module.exports = router;