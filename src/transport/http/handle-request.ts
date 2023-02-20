import http from 'http';
import { handleNonPOST } from "./handle-non-post-request";
import { handlePOST } from "./handle-post-request";

export const handleRequest = async (request: http.IncomingMessage, response: any) => {

    response.setHeader('Content-Type', 'application/json');

    if(request.method === 'POST') { await handlePOST(request, response); }
    else { return handleNonPOST(request, response); }
}