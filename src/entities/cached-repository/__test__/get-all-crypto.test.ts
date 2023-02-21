import mongoose from "mongoose"
import cache from "../../../cache"
import { getAllCrypto } from "../get-all-crypto"

const id = "63f3c2193fed35d19b054841"
const crypto = { _id: new mongoose.Types.ObjectId(id), name: 'bitcoin', symbol: 'btc', enabled: true}

it('crypto can be retrived through cache', async () => {

    /**
     * All crypto are empty on first initialization
     */
    const initialresult = await getAllCrypto()
    expect(initialresult.length).toEqual(0)

    /**
     * Check if it is created in the cache
     */
    await cache.connect()
    const cached = await cache.get('get-all-crypto')
    await cache.disconnect()

    expect(cached.length).toEqual(0)

    /**
     * Set crypto and see if it is gotten from the cache
     */
    await cache.connect()
    await cache.put('get-all-crypto', [ crypto ])
    await cache.disconnect()

    const finalresult = await getAllCrypto()
    expect(finalresult.length).toEqual(1)

    /** 
     * check if the cached items are accurate
     */
    expect(finalresult[0]._id).toEqual(id);
    expect(finalresult[0].name).toEqual(crypto.name);
    expect(finalresult[0].symbol).toEqual(crypto.symbol);
    expect(finalresult[0].enabled).toEqual(crypto.enabled);
})