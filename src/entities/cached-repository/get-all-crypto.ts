import cache from "../../cache"
import { CryptoDoc } from "../models/crypto"
import { getAllCrypto as getAllCryptoUnCached } from "../repository/get-all-crypto"

/**
 * keys where data is retrieved from in cache
 */
const key = 'get-all-crypto'

/**
 * This function retrieves all enabled crypto curriencies from the cache, and if it isn't set grab from the database
 * @returns all crypto in cache and database
 */
export const getAllCrypto = async () : Promise<CryptoDoc[]> => {
    try {
        await cache.connect()

        /**
         * chec if the key is set in the cache and if it is set then,
         * return without querying the database.
         */
        if(await cache.check(key)){
            const value = await cache.get(key)
            await cache.disconnect()
            return value
        }
    
        /**
         * get all the crypto from the database and set the result in the cache
         */
        const value = await getAllCryptoUnCached()
    
        await cache.put(key, value)
        await cache.disconnect()
    
        return value;
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}