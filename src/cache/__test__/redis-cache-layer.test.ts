import { Redis } from "../redis-cache-layer"

const redis = new Redis()
const key = 'test-key'

describe('redis cache can work as caching layer', () => {


    it('redis can be check if key exists and return false', async () => {
        await redis.connect()

        const checkifexists = await redis.check(key)
        expect(checkifexists).toEqual(false)

        await redis.disconnect()
    })

    it('redis can be check if key exists and return true', async () => {
        await redis.connect()

        await redis.put(key, '{}')

        const checkifexists = await redis.check(key)
        expect(checkifexists).toEqual(true)

        await redis.disconnect()
    })

    it('redis can delete key', async () => {
        await redis.connect()

        await redis.delete(key)

        const checkifexists = await redis.check(key)
        expect(checkifexists).toEqual(false)

        await redis.disconnect()
    })

    it('redis can insert data into it cache and retrieve', async () => {
        await redis.connect()

        await redis.put(key, {})
        const data = await redis.get(key)
        
        expect(data).toEqual({})

        await redis.disconnect()
    })
})