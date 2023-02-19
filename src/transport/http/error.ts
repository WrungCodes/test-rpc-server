import { METHOD_NOT_FOUND, METHOD_NOT_FOUND_CODE, METHOD_REQUIRED, METHOD_REQUIRED_CODE, PARAMS_REQUIRED, PARAMS_REQUIRED_CODE } from "./constants";
import { jsonResponse } from "./json-response";

export const methodRequired = () => jsonResponse({error: { message: METHOD_REQUIRED, code: METHOD_REQUIRED_CODE }}); 

export const paramsRequired = () => jsonResponse({ error: { message: PARAMS_REQUIRED, code: PARAMS_REQUIRED_CODE }});

export const methodNotFound = () => jsonResponse({ error: { message: METHOD_NOT_FOUND, code: METHOD_NOT_FOUND_CODE}});