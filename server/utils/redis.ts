
import { Redis } from 'ioredis';
require('dotenv').config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log('Attempting Redis connection...');
        const client = new Redis(process.env.REDIS_URL, {
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000); // Delay retry with backoff strategy
                console.log(`Redis connection attempt ${times}. Retrying in ${delay} ms...`);
                return delay;
            },
            connectTimeout: 10000, // 10 seconds timeout for connection attempts
        });

        client.on('connect', () => {
            console.log('Redis successfully connected.');
        });

        client.on('error', (err) => {
            console.error('Redis connection error:', err);
        });

        client.on('end', () => {
            console.log('Redis connection closed.');
        });

        return client;
    }
    
    throw new Error('Redis connection failed: REDIS_URL not provided.');
};

export const redis = redisClient();
