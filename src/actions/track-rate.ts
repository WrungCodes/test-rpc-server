import { addCrypto } from "../entities/cached-repository/add-crypto"

export const trackRate = async (name: string, symbol: string, enabled: boolean) => {
    return await addCrypto(name, symbol, enabled)
}