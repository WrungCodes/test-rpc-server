import axios, { AxiosInstance } from 'axios'
import { RateService, RateServiceInput, RateServiceOutput } from "./interface"

export default class CoinGeckoService implements RateService {
    private api: AxiosInstance
    constructor(){
        this.api = axios.create({
            baseURL: process.env.COIN_GECKO_URI,
            timeout: 20000,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async getCryptoRates(ids: RateServiceInput[]) : Promise<RateServiceOutput[]>
    {
        try {
            const response = await this.api.get('/simple/price', {
                params: {
                    vs_currencies: 'usd',
                    ids: this.parseInput(ids)
                }
            })
            return this.parseOutput(response.data)
        } catch(err) { 
            throw new Error(`COIN_GECKO rate api error: ${err}`);
        }
    }

    parseInput(ids: RateServiceInput[]) : string 
    {
        return ids.map(object => object.name).join(',');
    }

    parseOutput(result: any) : RateServiceOutput[]
    {
        const keys = Object.keys(result)

        const array: RateServiceOutput[] = []

        keys.forEach(key => { array.push({ name: key, price: result[key].usd }) })

        return array;
    }
}