import { createClient } from "redis";
/* eslint-disable no-inline-comments */
import type { RedisClientType } from 'redis'

export const redisConnection = async () : Promise<RedisClientType> => {
    if (!process.env.REDIS_URI) {
        throw new Error('REDIS_URI must be defined');
    }

    try {
        const client: RedisClientType = createClient({ url: process.env.REDIS_URI });
        await client.connect();

        return client;
    } catch (err) {
        throw new Error(`REDIS connection failed: ${err}`);
    }
}
