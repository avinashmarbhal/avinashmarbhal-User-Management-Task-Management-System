const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUserTasks
} = require("../controllers/adminController");

router.get("/users", auth, role("admin"), getUsers);
router.get("/users/:id/tasks", auth, role("admin"), getUserTasks);

module.exports = router;