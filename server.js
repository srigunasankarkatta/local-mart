const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const addressRoutes = require("./routes/addressRoutes");
const locationRoutes = require("./routes/locationRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/addresses", addressRoutes);
app.use("/locations", locationRoutes);

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://root:P45ueZlg6thjdHnr@local-mart-c1.cuu3p.mongodb.net/localmartdbv1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
