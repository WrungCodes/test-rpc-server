import cache from "../../cache"
import { CryptoDoc } from "../models/crypto"
import { addCrypto as addCryptoUnCached } from "../repository/add-crypto"
import { getAllCrypto as getAllCryptoUnCached } from "../repository/get-all-crypto"

/**
 * key to save into the cache
 */
const key = 'get-all-crypto'

/**
 * This functions adds new crypto to the database throught the cache.
 * @param name string - the name of the crypto currency, e.g bitcoin, this must be unique 
 * @param symbol string - the symbol used in representing the crypto currenency, e.g BTC
 * @param enabled boolean - wether or not the crypto is enabled to produce price
 * @returns the crypto added to the cache and database
 */
export const addCrypto = async (name: string, symbol: string, enabled: boolean) : Promise<CryptoDoc> => {
    try {
        await cache.connect()

        /**
         * set a new crypto in the database and update the cached value with the new addition
         */
        const value = await addCryptoUnCached(name, symbol, enabled)
        
        await cache.put(key, await getAllCryptoUnCached())
        await cache.disconnect()
    
        return value;

    } catch (error) {
        throw new Error(`${error}`);
    }
}