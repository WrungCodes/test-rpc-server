export interface RateService {
    getCryptoRates(ids: RateServiceInput[]) : Promise<RateServiceOutput[]>
}

export interface RateServiceInput {
    name: string
}

export interface RateServiceOutput {
    name: string,
    price: string
}