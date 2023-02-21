import { Crypto, CryptoDoc } from "../models/crypto"

/**
 * This functions gets all crypto currencies from the database that have been enabled. 
 * @returns all crypto currencies enabled in the database
 */
export const getAllCrypto = async () : Promise<CryptoDoc[]> => {
    try {
        return await Crypto.find({ enabled: true })
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}