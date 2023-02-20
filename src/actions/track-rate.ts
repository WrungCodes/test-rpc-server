import { addCrypto } from "../entities/cached-repository/add-crypto"
import { getAllCrypto } from "../entities/cached-repository/get-all-crypto";

export const trackRate = async (name: string, symbol: string, enabled: boolean) => {
    try {
        const cryptos = await getAllCrypto()

        const existingCrypto = cryptos.find(crypto => {
            return crypto.name === name
        })

        if(existingCrypto) { return existingCrypto }

        return await addCrypto(name, symbol, enabled)
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}