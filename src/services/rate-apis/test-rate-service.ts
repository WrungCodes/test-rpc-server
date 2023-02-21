import axios, { AxiosInstance } from 'axios'
import { RateService, RateServiceInput, RateServiceOutput } from "./interface"

export default class TestRateService implements RateService {
    constructor(){}

    private list = {
        'bitcoin' : '24000',
        'ethereum' : '3400',
        'litecoin' : '1000',
        'dogecoin' : '0.56',
    }

    async getCryptoRates(ids: RateServiceInput[]) : Promise<RateServiceOutput[]>
    {
        try {
            return this.parseOutput(ids, this.list);
        } catch(err) { 
            throw new Error(`TEST RATE SERVICE rate api error: ${err}`);
        }
    }

    parseOutput(ids: RateServiceInput[], result: any) : RateServiceOutput[]
    {
        const keys = Object.keys(result)

        const array: RateServiceOutput[] = []

        ids.forEach( crypto => { array.push({ name: crypto.name, price: result[crypto.name]}) })

        return array;
    }
}