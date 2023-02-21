import { Crypto } from "../../entities/models/crypto"
import { clearCryptoRates } from "../../rate/clear-cached-crypto-rates"
import { getRates } from "../get-rates"
import { trackRate } from "../track-rate"

it('can get rates of enabled crypto', async () => {

    const crypto1 = { name: 'bitcoin', symbol: 'btc', enabled: true}
    const crypto2 = { name: 'ethereum', symbol: 'eth', enabled: true}

    /**
     * All crypto are empty on first initialization
     */
    const initialresult = await getRates()
    expect(initialresult.length).toEqual(0)
    
    /**
     * After new crypto is added to database it should reflect on get rates
     */
    await trackRate(crypto1.name, crypto1.symbol, crypto1.enabled)
    await trackRate(crypto2.name, crypto2.symbol, crypto2.enabled)

    const finalresult = await getRates()
    expect(finalresult.length).toEqual(2)

    /**
     * Check if rates currency are the crypto currencies gotten are the same
     */
    expect(finalresult[0].name).toEqual(crypto1.name);
    expect(finalresult[0].price).toBeDefined();
    
    expect(finalresult[1].name).toEqual(crypto2.name);
    expect(finalresult[1].price).toBeDefined();
})