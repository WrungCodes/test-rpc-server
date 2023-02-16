import cache from "../../cache"
import { CryptoDoc } from "../models/crypto"
import { addCrypto as addCryptoUnCached } from "../repository/add-crypto"
import { getAllCrypto as getAllCryptoUnCached } from "../repository/get-all-crypto"

const key = 'get-all-crypto'

export const addCrypto = async (name: string, symbol: string, enabled: boolean) : Promise<CryptoDoc> => {
    await cache.connect()

    const value = await addCryptoUnCached(name,symbol,enabled)
    
    await cache.put(key, await getAllCryptoUnCached())

    await cache.disconnect()

    return value;
}