import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
  retryStrategy: (times) => {
    if (times > 3) {
      console.warn('Redis connection failed. Proceeding without Redis (Slot locking will not work).');
      return null; // Stop retrying
    }
    return Math.min(times * 50, 2000);
  }
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redis;
