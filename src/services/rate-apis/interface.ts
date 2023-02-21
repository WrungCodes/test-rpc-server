/**
 * Interface for all Rate Service to implement
 */
export interface RateService {
    /**
     * This functions return rates of crypto spefified in ids
     * @param ids - ids of a crypto to return the rates
     */
    getCryptoRates(ids: RateServiceInput[]) : Promise<RateServiceOutput[]>
}

export interface RateServiceInput {
    /**
     * name of the crypto
     */
    name: string
}

export interface RateServiceOutput {
    /**
     * name of the crypto
     */
    name: string,

    /**
     * price of the crypto
     */
    price: string
}