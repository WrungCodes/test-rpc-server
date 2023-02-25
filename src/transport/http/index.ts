import http from 'http';
import { handleRequest } from "./handle-request";
import { trackRateMethod } from "../../methods/track-rate-method";
import { getRatesMethod } from "../../methods/get-rate-method";
import { add_method } from "./methods";

export const httpserver = http.createServer((request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) => { 

    // register all methods here ...
    add_method('get_rate', getRatesMethod)
    add_method('track_rate', trackRateMethod)

    //handle all responses
    handleRequest(request, response)
})