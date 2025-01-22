const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../mongo_Schema/task");

const router = express.Router();

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, "@125!%&");
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(403).send("Invalid token");
  }
};

// Create Task
router.post("/", authenticate, async (req, res) => {
  const { title, description, status } = req.body;
  const task = new Task({ title, description, status, userId: req.userId });

  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get Tasks with Filters
router.get("/", authenticate, async (req, res) => {
  const { status } = req.query;
  const filter = {};

  if (req.userRole === "User") {
    filter.userId = req.userId;
  }
  if (status) filter.status = status;

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// Update Task
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, description, status },
      { new: true }
    );
    if (!task) return res.status(404).send("Task not found");
    res.status(200).json(task);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete Task
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) return res.status(404).send("Task not found");
    res.status(200).send("Task deleted successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});



module.exports = router;
