import { Crypto } from "../../models/crypto";
import { getAllCrypto } from "../get-all-crypto";

const crypto1 = { name: 'bitcoin', symbol: 'btc', enabled: true}
const crypto2 = { name: 'etheruem', symbol: 'eth', enabled: true}

it('crypto can be retrieved', async () => {

    /**
     * All crypto are empty on first initialization
     */
    const initialresult = await getAllCrypto()
    expect(initialresult.length).toEqual(0)

    /**
     * After new crypto is added to database it should reflect on get all crypto
     */
    await Crypto.build({...crypto1}).save()

    const result1 = await getAllCrypto()
    expect(result1.length).toEqual(1)

    expect(result1[0].id).toBeDefined();
    expect(result1[0].name).toEqual(crypto1.name);
    expect(result1[0].symbol).toEqual(crypto1.symbol);
    expect(result1[0].enabled).toEqual(crypto1.enabled);

    /**
     * Check if only one crypto is being added per time as created
     */
    await Crypto.build({...crypto2}).save()

    const result2 = await getAllCrypto()
    expect(result2.length).toEqual(2)
})