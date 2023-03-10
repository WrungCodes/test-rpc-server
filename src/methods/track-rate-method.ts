import { trackRate } from "../actions/track-rate"
import { paramsRequired } from "../transport/http/error";
import { handleUnautorizedRequest } from "../transport/http/handle-unauthorized-request";

export const trackRateMethod = async (request: any, response: any, params: any[], id?: string) => {
    try {
        
        if(!params[0] || !params[0].name || !params[0].symbol || !params[0].enabled) {
            return response.end(paramsRequired(id))
        }

        // validate api key for admin tracking
        if(!request.headers['x-api-key']){
            return handleUnautorizedRequest(request, response)
        }

        if(request.headers['x-api-key'] != process.env.ADMIN_API_KEY){
            return handleUnautorizedRequest(request, response)
        }
        
        return await trackRate(params[0].name, params[0].symbol, params[0].enabled)
    } catch (error) {
        throw new Error(`${error}`);
    }
}