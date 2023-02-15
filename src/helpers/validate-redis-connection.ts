import { createClient } from "redis";

/**
 * Check if REDIS ENV Variables is present and Test the connection
 */
export const validateRedisDBConnection = async () => {
    if (!process.env.REDIS_URI) {
        throw new Error('REDIS_URI must be defined');
    }

    try {
        const client = createClient({ url: process.env.REDIS_URI });
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        throw new Error(`REDIS connection failed: ${err}`);
    }
}