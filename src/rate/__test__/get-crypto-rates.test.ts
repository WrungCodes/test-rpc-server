import rateApis from "../../services/rate-apis";
import { RateServiceInput } from "../../services/rate-apis/interface";
import { getCryptoRates } from "../get-crypto-rates";

it('crypto rate can be gotten', async () => {

    const cryptos: RateServiceInput[] = [
        { name: 'bitcoin' },
        { name: 'ethereum' },
    ]

    /**
     * Check if created crypto is accurate
     */
    const rates = await getCryptoRates(cryptos)

    /**
     * check if rate gotten is same amount of rate inputed
     */
    expect(cryptos.length).toEqual(rates.length);

    /**
     * Check if rates currency are the crypto currencies gotten are the same
     */
    expect(cryptos[0].name).toEqual(rates[0].name);
    expect(rates[0].price).toBeDefined();
    
    expect(cryptos[1].name).toEqual(rates[1].name);
    expect(rates[1].price).toBeDefined();
})