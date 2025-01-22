const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../mongo_Schema/user");

const router = express.Router();
const JWT_SECRET = "@125!%&";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }] });

    if (existingUser) {
      return res.status(400).send("Error: email already exists");
    }

    const user = new User({ name, email, password, role: "User" });
    await user.save();
    res.status(201).send("User Registered");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


router.post("/register-admin", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }] });

    if (existingUser) {
      return res.status(400).send("Error: email already exists");
    }

    const user = new User({ name, email, password, role: "Admin" });
    await user.save();
    res.status(201).send("User Registered");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, role: user.role, user });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
