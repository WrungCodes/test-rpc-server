
import cache from "../../cache";
import { Crypto } from "../../entities/models/crypto";
import { trackRate } from "../track-rate";

it('new crypto can be tracked', async () => {

    const crypto = { name: 'bitcoin', symbol: 'btc', enabled: true}

    /**
     * Check if created crypto is accurate
     */
    const result = await trackRate(crypto.name, crypto.symbol, crypto.enabled)

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(crypto.name);
    expect(result.symbol).toEqual(crypto.symbol);
    expect(result.enabled).toEqual(crypto.enabled);

    /**
     * Check if the crypto has been created in the DB
     */
    const foundcrypto = await Crypto.find({ name: crypto.name })
    expect(foundcrypto.length).toEqual(1)
    expect(foundcrypto[0].name).toEqual(crypto.name)
    expect(foundcrypto[0].symbol).toEqual(crypto.symbol)
    expect(foundcrypto[0].enabled).toEqual(crypto.enabled)

    /**
     * Check if it has been created in the cache
     */

    await cache.connect()
    const cached = await cache.get('get-all-crypto')
    cache.disconnect()

    /**
     * check if the same amount of crypto in the cache as in the database
     */
    expect(cached.length).toEqual(1)

    /**
     * Check if the contents of the cache are correct
     */
    expect(cached[0].id).toBeDefined();
    expect(cached[0].name).toEqual(crypto.name);
    expect(cached[0].symbol).toEqual(crypto.symbol);
    expect(cached[0].enabled).toEqual(crypto.enabled);

    /**
     * check if duplicates crypto would not be created
     */
    const resultduplicate = await trackRate(crypto.name, crypto.symbol, crypto.enabled)

    /**
     * duplicate and original have same id meaning no new entry was created
     */
    expect(result.id).toEqual(resultduplicate.id);

})