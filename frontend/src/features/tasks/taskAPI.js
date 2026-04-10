import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `${token}`;
  }
  return req;
});

export const createTask = (data) => API.post("/tasks", data);
export const getMyTasks = () => API.get("/tasks/my");
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const getAllUsers = () => API.get("/admin/users");
export const getUserTasks = (userId) => API.get(`/admin/users/${userId}/tasks`);
