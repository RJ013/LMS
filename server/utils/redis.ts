// import {Redis} from 'ioredis';
// require('dotenv').config(); 

// const redisClient = () => {
//     if(process.env.REDIS_URL){
//         console.log('Redis connected');
//         return process.env.REDIS_URL;
//     }
//     throw new Error('Redis connection failed');
// };

// export const redis = new Redis(redisClient());







// import { Redis } from 'ioredis';
// require('dotenv').config(); 

// const redisClient = () => {
//     const redisHost = process.env.REDIS_HOST || '127.0.0.1'; // Default to localhost
//     const redisPort = process.env.REDIS_PORT || 6379; // Default Redis port

//     try {
//         const redis = new Redis({
//             host: redisHost,
//             port: redisPort,
//         });
//         console.log('Redis connected locally');
//         return redis;
//     } catch (error:any) {
//         throw new Error('Redis connection failed: ' + error.message);
//     }
// };

// export const redis = redisClient();





import { createClient } from 'redis';

let redisClient;

if (!redisClient) {
  redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  });

  redisClient.on('error', (err) => console.error('Redis error:', err));

  redisClient.connect().then(() => {
    console.log('Connected to Redis');
  }).catch((err) => {
    console.error('Failed to connect to Redis:', err);
  });
}

export default redisClient;
