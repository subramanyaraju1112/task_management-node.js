import { createClient } from "redis";

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on("connect", () => {
  console.log("Redis is connected");
});

redisClient.on("error", (error) => {
  console.error("Redis Error", error);
});

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("Redis Connection Failed", error.message);
  }
};

export default redisClient;
