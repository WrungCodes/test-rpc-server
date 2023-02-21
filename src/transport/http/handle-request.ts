import http from 'http';
import { handleNonPOST } from "./handle-non-post-request";
import { handlePOST } from "./handle-post-request";

/**
 * All api request are sent through here so be acted upon acordingly
 * @param request 
 * @param response 
 * @returns 
 */
export const handleRequest = async (request: http.IncomingMessage, response: any) => {

    /**
     * the content type is set to json here for all responses
     */
    response.setHeader('Content-Type', 'application/json');

    /**
     * Since this is RPC all GET request are treated as invalid
     */
    if(request.method === 'POST') { await handlePOST(request, response); }
    else { return handleNonPOST(request, response); }
}