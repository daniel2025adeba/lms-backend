const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
console.log("typeof userRoutes:", typeof userRoutes);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get("/", (req, res) => {
  res.send("LMS Backend API is running...");
});

const { errorHandler } = require("./middleware/errorMiddleware");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// app.use(errorHandler);
// Start server only if directly executed
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
// app.use(notFound);
// app.use(errorHandler);
module.exports = app;