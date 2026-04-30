const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const { course } = req.body;

    const existingCourse = await Course.findById(course);

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    res.status(500).json({ message: error.message });
  }
};

// Get my enrollments
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    }).populate("course", "title description");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update progress
const updateProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    if (String(enrollment.student) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    enrollment.progress = req.body.progress;

    if (req.body.progress >= 100) {
      enrollment.completed = true;
    }

    await enrollment.save();

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollCourse,
  getMyEnrollments,
  updateProgress,
};