/* eslint-disable no-inline-comments */
import type { RedisClientType } from 'redis'

import { redisConnection } from "../helpers/redis-connection";
import { CacheLayer } from "./interface";

export class Redis implements CacheLayer {
    client: RedisClientType | undefined;
    
    constructor(){}

    async connect() {
        this.client = await redisConnection()
    }

    async check(key: string) : Promise<boolean>
    {
        const reply = await this.client?.exists(key)
        if (reply === 1) { return true }
        return false;
    }

    async put(key: string, value: any, expireAfter: number = 86400) 
    {
        await this.client?.setEx(key, expireAfter, value)
    }

    async get(key: string) {
        return await this.client?.get(key)
    }

    async disconnect() {
        await this.client?.disconnect()
    }
}