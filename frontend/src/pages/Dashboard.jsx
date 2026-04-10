import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../features/tasks/taskSlice";
import {
  getMyTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../features/tasks/taskAPI";

import { getAllUsers, getUserTasks } from "../features/tasks/taskAPI";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  //  Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // ================= LOAD FUNCTIONS =================
  const loadTasks = async () => {
    const res = await getMyTasks();
    dispatch(setTasks(res.data));
  };

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  const loadSelectedUserTasks = async () => {
    if (!selectedUser) return;
    const res = await getUserTasks(selectedUser);
    dispatch(setTasks(res.data));
  };

  //  Unified reload function (IMPORTANT FIX)
  const reloadTasks = async () => {
    if (user.role === "admin" && selectedUser) {
      await loadSelectedUserTasks(); 
    } else {
      await loadTasks();
    }
  };

  // ================= USER ACTIONS =================
  const addTask = async () => {
    if (!title) return;
    await createTask({ title });
    setTitle("");
    reloadTasks();
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    reloadTasks(); 
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditText(task.title);
  };

  const saveEdit = async (id) => {
    await updateTask(id, { title: editText });
    setEditId(null);
    setEditText("");
    reloadTasks(); 
  };

  // ================= ADMIN =================
  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    const res = await getUserTasks(userId);
    dispatch(setTasks(res.data));
  };

  // ================= INIT =================
  useEffect(() => {
    if (!user) return;

    if (user.role === "admin") {
      loadUsers();
    } else {
      loadTasks();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
        <h2 className="text-3xl font-bold">
          {user?.role === "admin"
            ? ` Admin Dashboard (${user?.name})`
            : ` Dashboard (${user?.name})`}
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* ================= ADMIN VIEW ================= */}
      {user?.role === "admin" ? (
        <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-md">

          <h3 className="text-lg font-semibold mb-3">Users</h3>

          {/* User List */}
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => handleUserClick(u._id)}
              className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            >
              {u.name} ({u.email})
            </div>
          ))}

          {/* 🔥 Separate Task Section */}
          {selectedUser && (
            <div className="mt-6 bg-gray-100 p-4 rounded-xl">

              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">
                  Tasks of{" "}
                  {users.find((u) => u._id === selectedUser)?.name}
                </h3>

                <button
                  onClick={() => {
                    setSelectedUser(null);
                    dispatch(setTasks([])); // optional clear
                  }}
                  className="text-blue-500 hover:underline"
                >
                  ← Back
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((t) => (
                  <TaskCard
                    key={t._id}
                    task={t}
                    editId={editId}
                    editText={editText}
                    setEditText={setEditText}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    removeTask={removeTask}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= USER VIEW ================= */
        <>
          {/* Add Task */}
          <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-md mb-6">
            <div className="flex gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task..."
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow-md">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks</p>
            ) : (
              <div className="space-y-3">
                {tasks.map((t) => (
                  <TaskCard
                    key={t._id}
                    task={t}
                    editId={editId}
                    editText={editText}
                    setEditText={setEditText}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    removeTask={removeTask}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}