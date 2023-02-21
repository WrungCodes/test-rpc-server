import http from 'http';
import { METHOD_NOT_ALLOWED_CODE } from "./constants";

export const handleNonPOST = (request: http.IncomingMessage, response: any) => {
    response.statusCode = METHOD_NOT_ALLOWED_CODE;
    return response.end();
}