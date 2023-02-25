import { seedDefaultCrypto } from "./seed-default-crypto";

export const seed = async () => {
    try {
        /**
         * add all seed functions here
         */
        await seedDefaultCrypto()
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}