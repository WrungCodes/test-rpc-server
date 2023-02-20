import { Crypto } from "../models/crypto"

export const addCrypto = async (name: string, symbol: string, enabled: boolean) => {
    try {
        const crypto = Crypto.build({
            name,
            symbol,
            enabled
        })
    
        return await crypto.save()
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}