import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./Config/db.js";
// import rateLimit from "express-rate-limit";
import { limiter } from "./Utils/redis.js"; 
import userRouter from "./Routes/user.routes.js";
import todoRouter from "./Routes/todo.routes.js";
dotenv.config();
const server = express();

// ✅ CORS Setup
server.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// const limiter=rateLimit({
//   max:100,
//   windowMs:60*60*1000,
//   message:"retry after some time , two many requests"
// })

server.use(express.json());
server.use(cookieParser());

// ✅ Apply Redis Rate Limiter to all API routes
server.use("/api", limiter);

server.use("/api/v1/user", userRouter);
server.use("/api/v1/todo", todoRouter);

const port = process.env.PORT || 2000;
server.listen(port, () => {
  connectDb();
  console.log("The server is running on port " + port);
});

// rate limiting 

// 1--> express rate limiting--non presistence --restart in server refresh
// 2--> redisstore rate limiting-- presistent--inmemory.


// server side caching

// node cache-->  inmemory
// redis cache--> persistant(distributed)
