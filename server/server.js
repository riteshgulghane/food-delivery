const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const UserRoutes = require("./routes/user.route");
const RestaurantRoutes = require("./routes/restaurant.route");

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api/user", UserRoutes);

app.use("/api/restaurant", RestaurantRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
