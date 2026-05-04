const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const { protect } = require("../middleware/authMiddleware");

/**
 * ✅ CREATE ENROLLMENT
 */
router.post("/", protect, async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: "Course ID required",
      });
    }

    const existing = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/**
 * ✅ GET MY COURSES (FOR DASHBOARD)
 */
router.get("/my-courses", protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    }).populate("course");

    res.json({
      enrollments, // ✅ matches your frontend expectation
    });
  } catch (error) {
    console.error("Fetch my courses error:", error);
    res.status(500).json({
      message: "Failed to fetch enrollments",
    });
  }
});

/**
 * ✅ CHECK IF USER IS ENROLLED (VERY IMPORTANT FOR UI)
 */
router.get("/check/:courseId", protect, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.courseId,
    });

    res.json({
      enrolled: !!enrollment,
    });
  } catch (error) {
    console.error("Check enrollment error:", error);
    res.status(500).json({
      message: "Failed to check enrollment",
    });
  }
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const Enrollment = require("../models/Enrollment");
// const { protect } = require("../middleware/authMiddleware");

// // ==========================
// // CREATE ENROLLMENT
// // ==========================
// router.post("/", protect, async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     if (!courseId) {
//       return res.status(400).json({ message: "Course ID required" });
//     }

//     const existing = await Enrollment.findOne({
//       student: req.user._id,
//       course: courseId,
//     });

//     if (existing) {
//       return res.status(400).json({ message: "Already enrolled" });
//     }

//     const enrollment = await Enrollment.create({
//       student: req.user._id,
//       course: courseId,
//     });

//     res.status(201).json({
//       message: "Enrollment successful",
//       enrollment,
//     });
//   } catch (error) {
//     console.error("Enrollment creation error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ==========================
// // GET MY ENROLLED COURSES
// // ==========================
// router.get("/my-courses", protect, async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find({
//       student: req.user._id,
//     }).populate("course");

//     res.status(200).json({
//       count: enrollments.length,
//       enrollments,
//     });
//   } catch (error) {
//     console.error("Fetch my courses error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ==========================
// // GET ALL ENROLLMENTS
// // ==========================
// router.get("/", protect, async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find()
//       .populate("student", "name email")
//       .populate("course", "title");

//     res.status(200).json({
//       count: enrollments.length,
//       enrollments,
//     });
//   } catch (error) {
//     console.error("Fetch all enrollments error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const Enrollment = require("../models/Enrollment");
// const { protect } = require("../middleware/authMiddleware");

// router.post("/", protect, async (req, res) => {
//   try {
//     const { courseId } = req.body;

//     if (!courseId) {
//       return res.status(400).json({
//         message: "Course ID required",
//       });
//     }

//     const existing = await Enrollment.findOne({
//       student: req.user._id,   // ✅ FIXED
//       course: courseId,
//     });

//     if (existing) {
//       return res.status(400).json({
//         message: "Already enrolled",
//       });
//     }

//     const enrollment = await Enrollment.create({
//       student: req.user._id,   // ✅ FIXED
//       course: courseId,
//     });

//     res.status(201).json({
//       message: "Enrollment successful",
//       enrollment,
//     });
//   } catch (error) {
//     console.error("Enrollment error:", error);
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// module.exports = router;
