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
export const getCryptoRates = async (ids: RateServiceInput[]) : Promise<RateServiceOutput[]> => {
    try {
        await cache.connect()
    
        /**
         * Check if the rate is present in the cache and get it if present.
         */
        if(await cache.check(key)){
            const value = await cache.get(key)
            await cache.disconnect()
            return value
        }
    
        /**
         * If rate isn't set or rate has expired get the rate afresh and save it to the cache
         * set the rate to expire within 30 seconds
         */
        const value = await getCryptoRatesUnCached(ids)
        await cache.put(key, value, 30)
    
        await cache.disconnect()
    
        return value;
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}