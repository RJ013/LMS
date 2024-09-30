

import {Redis} from 'ioredis';
require('dotenv').config(); 

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Redis connected');
        return new Redis(process.env.REDIS_URL, {
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000); // Delay retry with backoff strategy
                return delay;
            }
        });
    }
    throw new Error('Redis connection failed');
};

export const redis = redisClient();