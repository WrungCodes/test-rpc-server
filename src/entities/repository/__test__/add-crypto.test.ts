import { Crypto } from "../../models/crypto";
import { addCrypto } from "../add-crypto"

const crypto = { name: 'bitcoin', symbol: 'btc', enabled: true}

it('crypto can be added', async () => {

    /**
     * Check if created crypto is accurate
     */
    const result = await addCrypto(crypto.name, crypto.symbol, crypto.enabled)

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(crypto.name);
    expect(result.symbol).toEqual(crypto.symbol);
    expect(result.enabled).toEqual(crypto.enabled);

    /**
     * Check if only one crypto is being created per time
     */
    const allcryptos = await Crypto.find()
    expect(allcryptos.length).toEqual(1)

})