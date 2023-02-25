import { trackRate } from "../actions/track-rate";

/**
 * This method seeds default crypto to the system during start up
 */
export const seedDefaultCrypto = async () => {
    try {
        await trackRate('bitcoin', 'BTC', true)
        await trackRate('ethereum', 'ETH', true)
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}