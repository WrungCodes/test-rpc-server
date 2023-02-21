import cache from "../../cache";
import { RateServiceInput } from "../../services/rate-apis/interface";
import { getCryptoRates } from "../cached-crypto-rates";

it('crypto rate can be gotten from cache', async () => {

    /**
     * Check that cache is empty at first
     */
    await cache.connect()
    const initialcache = await cache.get('get-crypto-rates')
    await cache.disconnect()

    expect(initialcache).toEqual(null)


    const cryptos: RateServiceInput[] = [
        { name: 'bitcoin' },
        { name: 'ethereum' },
    ]

    /**
     * Check if rate is created in the cache
     */
    const rates = await getCryptoRates(cryptos)

    await cache.connect()
    const cached = await cache.get('get-crypto-rates')
    await cache.disconnect()

    expect(cached.length).toEqual(rates.length)

    /**
     * Check if rates in cache are the same with rate gotten
     */
    expect(cached[0].name).toEqual(rates[0].name);
    expect(cached[0].price).toEqual(rates[0].price);
    
    expect(cached[1].name).toEqual(rates[1].name);
    expect(cached[1].price).toEqual(rates[1].price);
})