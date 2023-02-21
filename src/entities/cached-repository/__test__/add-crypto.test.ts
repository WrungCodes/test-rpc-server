import cache from "../../../cache";
import { Crypto } from "../../models/crypto";
import { addCrypto } from "../add-crypto"

const crypto = { name: 'bitcoin', symbol: 'btc', enabled: true}

it('crypto can be added through cache', async () => {

    /**
     * Add crypto to and see if crypto is present in cache and database
     */
    const result = await addCrypto(crypto.name, crypto.symbol, crypto.enabled)

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(crypto.name);
    expect(result.symbol).toEqual(crypto.symbol);
    expect(result.enabled).toEqual(crypto.enabled);

    /**
     * Check if only one crypto is being created per time in the database
     */
    const allcryptos = await Crypto.find()
    expect(allcryptos.length).toEqual(1)

    /**
     * Check if it is created in the cache
     */
    await cache.connect()
    const cached = await cache.get('get-all-crypto')
    cache.disconnect()

    /**
     * check if the same amount of crypto in the cache as in the database
     */
    expect(cached.length).toEqual(allcryptos.length)

    /**
     * Check if the contents of the cache are correct
     */
    expect(cached[0].id).toBeDefined();
    expect(cached[0].name).toEqual(crypto.name);
    expect(cached[0].symbol).toEqual(crypto.symbol);
    expect(cached[0].enabled).toEqual(crypto.enabled);

})