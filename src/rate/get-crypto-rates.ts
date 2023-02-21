import rateApis from "../services/rate-apis"
import { RateServiceInput, RateServiceOutput } from "../services/rate-apis/interface"

/**
 * This function returns the rates of crypto inputed.
 * @param ids names of the crypto currency to get rates for
 * @returns list of cryptos and prices
 */
export const getCryptoRates = async (ids: RateServiceInput[]) : Promise<RateServiceOutput[]> => {
    return await rateApis.getCryptoRates(ids)
}