// redis.js
import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",  // or your Redis host
  port: 6379,
  // password: "your_redis_password", // if applicable
});

redis.on("connect", () => console.log("Redis connected ✅"));
redis.on("error", (err) => console.log("Redis error ❌", err));

export default redis;
