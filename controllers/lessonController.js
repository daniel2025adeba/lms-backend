// const Lesson = require("../models/Lesson");
// const Course = require("../models/Course");

// // Create lesson
// const createLesson = async (req, res) => {
//   try {
//     const { course } = req.body;

//     const existingCourse = await Course.findById(course);

//     if (!existingCourse) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const lesson = await Lesson.create(req.body);

//     res.status(201).json(lesson);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get lessons by course
// const getLessonsByCourse = async (req, res) => {
//   try {
//     const lessons = await Lesson.find({ course: req.params.courseId }).sort({
//       order: 1,
//     });

//     res.status(200).json(lessons);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single lesson
// const getLessonById = async (req, res) => {
//   try {
//     const lesson = await Lesson.findById(req.params.id).populate("course", "title");

//     if (!lesson) {
//       return res.status(404).json({ message: "Lesson not found" });
//     }

//     res.status(200).json(lesson);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createLesson,
//   getLessonsByCourse,
//   getLessonById,
// };

const Lesson = require("../models/Lesson");

exports.createLesson = async (req, res) => {
  try {
    const {
      title,
      content,
      videoUrl,
      resourceUrl,
      order,
      courseId,
    } = req.body;

    if (!title || !content || !courseId) {
      return res.status(400).json({
        message: "Title, content, and courseId are required",
      });
    }

    const lesson = await Lesson.create({
      title,
      content,
      videoUrl,
      resourceUrl,
      order,
      courseId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    console.error("Create lesson error:", error);
    res.status(500).json({
      message: "Failed to create lesson",
      error: error.message,
    });
  }
};

exports.getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      courseId: req.params.courseId,
    }).sort({ order: 1 });

    res.json(lessons);
  } catch (error) {
    console.error("Fetch lessons error:", error);
    res.status(500).json({
      message: "Failed to fetch lessons",
    });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    res.json(lesson);
  } catch (error) {
    console.error("Update lesson error:", error);
    res.status(500).json({
      message: "Failed to update lesson",
    });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(
      req.params.id
    );

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    res.json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Delete lesson error:", error);
    res.status(500).json({
      message: "Failed to delete lesson",
    });
  }
};