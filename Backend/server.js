const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/tasks", require("./src/routes/taskRoutes"));
app.use("/api/admin", require("./src/routes/adminRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);