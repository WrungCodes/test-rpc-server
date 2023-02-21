import { Crypto } from "../models/crypto"

/**
 * create and add new crypto with properties name, symbol, enabled to the mongodb database
 * this function returns the crypto that was created and saved 
 * @param name string - the name of the crypto currency, e.g bitcoin, this must be unique 
 * @param symbol string - the symbol used in representing the crypto currenency, e.g BTC
 * @param enabled boolean - wether or not the crypto is enabled to produce proce
 */
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