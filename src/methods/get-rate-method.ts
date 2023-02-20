import { getRates } from "../actions/get-rates"

export const getRatesMethod = async (params: any) => {
    try {
        return { 'rates': await getRates()}
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}