import cache from "../cache"
import { RateServiceInput, RateServiceOutput } from "../services/rate-apis/interface"
import { getCryptoRates as getCryptoRatesUnCached } from "./get-crypto-rates"

/**
 * cache key where rates are saved
 */
const key = 'get-crypto-rates'

/**
 * This function returns the rates of crypto inputed from the cache if it is present there.
 * @param ids names of the crypto currency to get rates for
 * @returns list of cryptos and prices
 */
export const clearCryptoRates = async () => {
    try {
        await cache.connect()
    
        /**
         * Check if the rate is present in the cache and get it if present.
         */
        // if(await cache.check(key)){
            // const value = 
            await cache.delete(key)
            // await cache.disconnect()
            // return value
        // }
    
        await cache.disconnect()

        return false;
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}