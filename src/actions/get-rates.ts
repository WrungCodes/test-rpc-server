import { getAllCrypto } from "../entities/cached-repository/get-all-crypto"
import { getCryptoRates } from "../rate/cached-crypto-rates"

/**
 * This function returns all crypto rates of crypto enabled.
 * @returns all rates of crypto being tracked
 */
export const getRates = async () => {
    try {
        return await getCryptoRates((await getAllCrypto()).map(crypto => { return { name: crypto.name } }))  
    } catch (error: any) {
        throw new Error(`${error.massage}`);
    }
}