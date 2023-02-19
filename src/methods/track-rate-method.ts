import { trackRate } from "../actions/track-rate"

export const trackRateMethod = async (params: { name: string; symbol: string; enabled: boolean }) => {
    return await trackRate(params.name, params.symbol, params.enabled)
}