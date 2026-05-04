// 



// middleware/courseAccess.js

const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const requireEnrollment = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Admin / Instructor bypass
    if (
      user.role === "admin" ||
      user.role === "instructor"
    ) {
      return next();
    }

    const courseId =
      req.params.courseId || req.body.courseId;

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID missing",
      });
    }

    // ✅ Validate course exists (important)
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // ✅ Correct ID usage
    const enrollment = await Enrollment.findOne({
      student: user._id,
      course: courseId,
    });

    console.log("Enrollment check:", {
      user: user._id.toString(),
      courseId,
      enrolled: !!enrollment,
    });

    if (!enrollment) {
      return res.status(403).json({
        message: "Access denied. Please enroll first.",
      });
    }

    next();
  } catch (error) {
    console.error("Enrollment middleware error:", error);
    res.status(500).json({
      message: "Enrollment verification failed",
    });
  }
};

module.exports = requireEnrollment;