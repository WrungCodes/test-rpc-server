import { Crypto, CryptoDoc } from "../models/crypto"

export const getAllCrypto = async () : Promise<CryptoDoc[]> => {
    return await Crypto.find({ enabled: true })
}