import rateApis from "../services/rate-apis"
import { RateServiceInput } from "../services/rate-apis/interface"

export const getCryptoRates = async (ids: RateServiceInput[]) => {
    return await rateApis.getCryptoRates(ids)
}