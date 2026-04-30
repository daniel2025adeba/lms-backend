// const express = require("express");
// const router = express.Router();

// const {
//   getAllUsers,
//   getUserById,
// } = require("../controllers/userController");

// const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// // Admin-only route
// router.get("/", protect, authorizeRoles("admin"), getAllUsers);

// // Authenticated users can view specific profile
// router.get("/:id", protect, getUserById);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin-only route to get all users
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

// Dedicated admin test route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

// Authenticated users can view specific profile
router.get("/:id", protect, getUserById);

module.exports = router;