import http from 'http';
import { handleNonPOST } from "./handle-non-post-request";
import { handlePOST } from "./handle-post-request";

export const handleRequest = (request: http.IncomingMessage, response: any) => {

    response.setHeader('Content-Type', 'application/json');

    if(request.method === 'POST') { handlePOST(request, response); }
    else { handleNonPOST(request, response); }
}