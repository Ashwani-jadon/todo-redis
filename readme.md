# 📝 Todo App Backend

A high-performance, RESTful **Todo application backend** built with  
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />

> This project enables users to **create**, **read**, **update**, and **delete** tasks with **real-time performance** optimization using Redis-based caching.

---

## 🚀 Features

- ✅ Full CRUD for todos
- ⚡ Redis caching for fast reads
- 🔐 Environment-based config
- 🔁 RESTful API structure
- 📦 Scalable folder structure
- 🧪 Ready for frontend consumption

---

## 🛠️ Tech Stack

| Tool        | Description                              |
|-------------|------------------------------------------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | JavaScript runtime for backend logic |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Minimal and flexible web framework   |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-4EA94B?logo=mongodb&logoColor=white) | NoSQL document database              |
| ![Redis](https://img.shields.io/badge/-Redis-DC382D?logo=redis&logoColor=white)       | In-memory caching layer              |
| ![dotenv](https://img.shields.io/badge/-dotenv-000000?logo=dotenv&logoColor=white)     | Environment variable loader          |

---

## 📁 Project Structure

```bash
todo-backend/
├── controllers/       # Route logic
├── models/            # Mongoose schemas
├── routes/            # API endpoints
├── services/          # Redis and helper logic
├── utils/             # Utility functions
├── .env               # Environment configs
├── .gitignore
├── app.js             # App setup
├── server.js          # Server entry point
└── README.md
