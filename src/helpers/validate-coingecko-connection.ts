import mongoose from "mongoose";

/**
 * Check if CoinGecko ENV Variables is present and Test the connection
 */
export const validateCoinGeckoConnection = async () => {
    if (!process.env.COIN_GECKO_URI) {
        throw new Error('COIN_GECKO_URI must be defined');
    }

    // try pinging coin_gecko_uri
}