import { redisConnection } from "./redis-connection";

/**
 * Check if REDIS ENV Variables is present and Test the connection
 */
export const validateRedisDBConnection = async () => {
    await redisConnection();
}