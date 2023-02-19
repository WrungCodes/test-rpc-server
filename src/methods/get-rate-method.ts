import { getRates } from "../actions/get-rates"

export const getRatesMethod = async (params: any) => {
    return await getRates()
}