import { getAllCrypto } from "../entities/cached-repository/get-all-crypto"
import { getCryptoRates } from "../rate/cached-crypto-rates"

export const getRates = async () => {
    try {
        return await getCryptoRates((await getAllCrypto()).map(crypto => { return { name: crypto.name } }))  
    } catch (error: any) {
        throw new Error(`${error.massage}`);
    }
}