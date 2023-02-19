import http from 'http';
import { INVALID_REQUEST, INVALID_REQUEST_CODE } from "./constants";

export const handleInvalidRequest = (request: http.IncomingMessage, response: any) => {
    response.statusCode = INVALID_REQUEST_CODE;
    return response.end(INVALID_REQUEST);
}