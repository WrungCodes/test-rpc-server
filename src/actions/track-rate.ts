import { addCrypto } from "../entities/cached-repository/add-crypto"
import { getAllCrypto } from "../entities/cached-repository/get-all-crypto";
import { clearCryptoRates } from "../rate/clear-cached-crypto-rates";

/**
 * This function is to add a new crypto to the list of crypto for the rate to be tracked
 * @param name string - the name of the crypto currency, e.g bitcoin, this must be unique 
 * @param symbol string - the symbol used in representing the crypto currenency, e.g BTC
 * @param enabled boolean - wether or not the crypto is enabled to produce price
 * @returns the new crypto added.
 */
export const trackRate = async (name: string, symbol: string, enabled: boolean) => {
    try {
        const cryptos = await getAllCrypto()

        /**
         * get all existing crypto and check if this is a duplicate
         */
        const existingCrypto = cryptos.find(crypto => {
            return crypto.name === name
        })

        /**
         * if duplicate is found return the duplicate and do not create a new crypto
         */
        if(existingCrypto) { return existingCrypto }

        /**
         * if crypto is not dupicate we can clear the current cache of the rates
         */
        await clearCryptoRates()


        return await addCrypto(name, symbol, enabled)
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}