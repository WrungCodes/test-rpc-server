import { Crypto, CryptoDoc } from "../models/crypto"

export const getAllCrypto = async () : Promise<CryptoDoc[]> => {
    try {
        return await Crypto.find({ enabled: true })
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}