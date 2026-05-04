// const Course = require("../models/Course");

// // Create course
// const createCourse = async (req, res) => {
//   try {
//     const course = await Course.create({
//       ...req.body,
//       instructor: req.user._id,
//     });
    
//     res.status(201).json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all courses
// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("instructor", "name email");
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single course
// const getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate(
//       "instructor",
//       "name email"
//     );

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // module.exports = {
// //   createCourse,
// //   getCourses,
// //   getCourseById,
// // };
// module.exports = {
//   createCourse,
//   getCourses,
//   getCourseById,
//   //deleteCourse,
// };






// const Course = require("../models/Course");

// // Create course
// const createCourse = async (req, res) => {
//   try {
//     const { title, description, instructor, price } = req.body;

//     if (!title || !description) {
//       return res.status(400).json({
//         message: "Title and description are required",
//       });
//     }

//     const course = await Course.create({
//       title,
//       description,
//       instructor,
//       price,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({
//       message: "Course created successfully",
//       course,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all courses
// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get one course
// const getCourseById = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update course
// const updateCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const updated = await Course.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Course updated successfully",
//       updated,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete course
// const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     await course.deleteOne();

//     res.status(200).json({
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   createCourse,
//   getCourses,
//   getCourseById,
//   updateCourse,
//   deleteCourse,
// };





const Course = require("../models/Course");

// Create course
const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;

    if (!title || !description || !instructor) {
      return res.status(400).json({
        message: "Title, description, and instructor are required",
      });
    }

    const course = await Course.create({
      title,
      description,
      instructor,
      price: Number(price) || 0,
      createdBy: req.user?._id || null,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// Get one course
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Get course error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        price: Number(req.body.price) || 0,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      updated,
    });
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};