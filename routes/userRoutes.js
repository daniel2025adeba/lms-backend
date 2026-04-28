const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Admin-only route
router.get("/", protect, authorizeRoles("admin"), getAllUsers);

// Authenticated users can view specific profile
router.get("/:id", protect, getUserById);

module.exports = router;