import cache from "../../cache"
import { CryptoDoc } from "../models/crypto"
import { getAllCrypto as getAllCryptoUnCached } from "../repository/get-all-crypto"

const key = 'get-all-crypto'

export const getAllCrypto = async () : Promise<CryptoDoc[]> => {
    try {
        await cache.connect()

        if(await cache.check(key)){
            return await cache.get(key)
        }
    
        const value = await getAllCryptoUnCached()
    
        await cache.put(key, value)
        await cache.disconnect()
    
        return value;
    } catch (error: any) {
        throw new Error(`${error.message}`)
    }
}