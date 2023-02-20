import cache from "../cache"
import { RateServiceInput, RateServiceOutput } from "../services/rate-apis/interface"
import { getCryptoRates as getCryptoRatesUnCached } from "./get-crypto-rates"

const key = 'get-crypto-rates'

export const getCryptoRates = async (ids: RateServiceInput[]) : Promise<RateServiceOutput[]> => {
    try {
        await cache.connect()
    
        if(await cache.check(key)){
            return await cache.get(key)
        }
    
        const value = await getCryptoRatesUnCached(ids)
        await cache.put(key, value, 30)
    
        await cache.disconnect()
    
        return value;
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}