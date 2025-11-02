# 🔐 passProtect

**passProtect** is a secure and modern password manager built with **React (Vite)** for the frontend and **Express + MongoDB** for the backend.  
It allows users to store, manage, and access their passwords safely in an encrypted database.

---

## 🚀 Features
- 🔑 Store and manage passwords securely
- ⚙️ Backend API built with Express.js
- ⚡ Frontend powered by React + Vite + Tailwind
- 💾 Persistent data with local MongoDB
- 🎨 Simple and intuitive UI

---

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/pritam-bsk/passProtect.git
cd passProtect
```
### 2️⃣ Install dependencies
```bash
npm install
cd backend
npm install
```

### 3️⃣ Setup environment variables
change the .env file inside the backend/ directory:
```bash
MONGO_URL = your_mongodb_connection_string
DB_NAME = 'passprotect'
```
### 4️⃣ Run the project
Start backend server
```bash
node --watch server.js
```
Start the App
```bash
npm run dev
```
Then open:
👉 http://localhost:5173