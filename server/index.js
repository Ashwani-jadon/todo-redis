import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // ✅ Import CORS
import connectDb from "./Config/db.js";

import userRouter from "./Routes/user.routes.js";
import todoRouter from "./Routes/todo.routes.js";

dotenv.config();
const server = express();

// ✅ CORS Middleware
server.use(cors({
  origin: "http://localhost:5173", // ✅ your frontend URL
  credentials: true, // ✅ allows cookies and headers to be sent
}));

server.use(express.json());
server.use(cookieParser());

server.use("/api/v1/user", userRouter);
server.use("/api/v1/todo", todoRouter);

const port = process.env.PORT || 2000;
server.listen(port, () => {
  connectDb();
  console.log("The server is running on port " + port);
});
