// redis.js
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

// Create Redis client
const redisClient = new Redis();

// Export rate limiter middleware
export const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  windowMs: 60*60 * 1000, // 1 hour window , 100 request per hour.
  max: 100,
  message: "Too many requests, please try again later.",
});

export default redisClient;

