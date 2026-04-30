const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessonsByCourse,
  getLessonById,
} = require("../controllers/lessonController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Instructor/Admin can create lessons
router.post("/", protect, authorizeRoles("instructor", "admin"), createLesson);

// Public fetch lessons by course
router.get("/course/:courseId", getLessonsByCourse);

// Public fetch single lesson
router.get("/:id", getLessonById);

module.exports = router;