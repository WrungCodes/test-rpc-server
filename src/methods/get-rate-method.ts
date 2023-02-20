import { getRates } from "../actions/get-rates"

export const getRatesMethod = async (_request: any, _response: any, _params: any) => {
    try {
        return { 'rates': await getRates()}
    } catch (error: any) {
        throw new Error(`${error.message}`);
    }
}