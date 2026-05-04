const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");
const requireEnrollment = require("../middleware/courseAccess");

// ✅ Only admin/instructor can create
router.post(
  "/",
  protect,
  authorizeRoles("admin", "instructor"),
  createLesson
);

// ✅ Students must be enrolled
router.get(
  "/:courseId",
  protect,
  requireEnrollment,
  getLessonsByCourse
);

// ✅ Only admin/instructor can modify
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "instructor"),
  updateLesson
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "instructor"),
  deleteLesson
);

module.exports = router;

// const express = require("express");
// const router = express.Router();

// const {
//   createLesson,
//   getLessonsByCourse,
//   updateLesson,
//   deleteLesson,
// } = require("../controllers/lessonController");

// const { protect } = require("../middleware/authMiddleware");

// router.post("/", protect, createLesson);
// router.get("/:courseId", protect, getLessonsByCourse);
// router.put("/:id", protect, updateLesson);
// router.delete("/:id", protect, deleteLesson);

// module.exports = router;