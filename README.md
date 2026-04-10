# User Management & Task Management System

A full-stack MERN application to manage users and their tasks. It includes authentication, task creation, and user-based task management.

---

## 🚀 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **State Management:** (Redux if used, else remove)

---

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/avinashmarbhal/avinashmarbhal-User-Management-Task-Management-System.git
cd avinashmarbhal-User-Management-Task-Management-System
```

---

## ⚙️ Node.js Version

* Recommended: **Node.js v18+**

Check your version:

```bash
node -v
```

---

## ⚛️ React.js Version

* React: **^18.x**

Check version:

```bash
npm list react
```

---

## 🔐 Environment Variables Setup

### Backend (`/Backend` folder)

Create a `.env` file inside the **Backend** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```


## ▶️ Running the Project

### 1️⃣ Start Backend

```bash
cd Backend
npm install
npm run dev
```

OR (if no dev script):

```bash
npm start
```

Backend runs on:
👉 http://localhost:5000

---

### 2️⃣ Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
👉 http://localhost:3000

---

## 📁 Project Structure

```
├── Backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── server.js
│
├── frontend
│   ├── src
│   ├── components
│   └── App.js
```

---

## ✨ Features

* User Authentication (Login/Register)
* Create, Update, Delete Tasks
* User-specific task management
* Secure API using JWT

---

## 🙌 Author

**Avinash Marbhal**

---

## 📌 Future Improvements

* Add task status tracking (pending, completed)
* Add pagination
* Improve UI/UX
* Add role-based access control

---
