const User = require("../models/User");
const Task = require("../models/Task");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUserTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.params.id });
  res.json(tasks);
};