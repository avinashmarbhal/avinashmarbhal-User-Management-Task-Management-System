const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    
    if (!title || title.trim() === "") {
      return res.status(400).json({ msg: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// GET MY TASKS
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.findById(req.params.id);

    
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

   
    if (
      task.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    
    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({ msg: "Title cannot be empty" });
    }

    
    if (title) task.title = title;
    if (description) task.description = description;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      task.createdBy.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    await task.deleteOne();

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};