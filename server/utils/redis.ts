import { Redis } from 'ioredis';
require('dotenv').config(); 

const redisClient = () => {
    const redisHost = process.env.REDIS_HOST || '127.0.0.1'; // Default to localhost
    const redisPort = process.env.REDIS_PORT || 6379; // Default Redis port

    try {
        const redis = new Redis({
            host: redisHost,
            port: redisPort,
        });
        console.log('Redis connected locally');
        return redis;
    } catch (error:any) {
        throw new Error('Redis connection failed: ' + error.message);
    }
};

export const redis = redisClient();