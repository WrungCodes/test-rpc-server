import { Crypto } from "../models/crypto"

export const addCrypto = async (name: string, symbol: string, enabled: boolean) => {
    const crypto = Crypto.build({
        name,
        symbol,
        enabled
    })

    return await crypto.save()
}