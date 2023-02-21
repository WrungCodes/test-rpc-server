import http from 'http';
import { handleRequest } from "./handle-request";
import { trackRateMethod } from "../../methods/track-rate-method";
import { getRatesMethod } from "../../methods/get-rate-method";

/**
 * Simple map to store all methods for simple look up
 */
let methods = new Map<string, any>();

export const httpserver = http.createServer((request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) => { 

    // register all methods here ...
    add_method('get_rate', getRatesMethod)
    add_method('track_rate', trackRateMethod)

    //handle all responses
    handleRequest(request, response)
})

export const add_method = (name: string, func: any) => { methods.set(name, func) }
export const find_method = (name: string) => { return methods.get(name) }