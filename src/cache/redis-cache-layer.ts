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
        try {
            const reply = await this.client?.exists(key)
            if (reply === 1) { return true }
            return false;
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    async put(key: string, value: any, expireAfter: number = 86400) 
    {
        try {
         await this.client?.set(key, JSON.stringify(value), { EX: expireAfter })
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    async get(key: string) {
        try {
            const reply = await this.client?.get(key);
            if(reply != null || reply != undefined) { return JSON.parse(reply) }
            return reply 
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }

    async disconnect() {
        try {
            await this.client?.disconnect()
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    }
}