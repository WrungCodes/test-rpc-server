import http from 'http';
import { UNAUTHORIZED_REQUEST_CODE } from "./constants";

export const handleUnautorizedRequest = (request: http.IncomingMessage, response: any) => {
    response.statusCode = UNAUTHORIZED_REQUEST_CODE;
    return response.end();
}