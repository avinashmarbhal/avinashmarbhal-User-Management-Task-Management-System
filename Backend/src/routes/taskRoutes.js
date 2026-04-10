const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/my", auth, getMyTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;