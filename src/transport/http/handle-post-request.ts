import { find_method } from ".";
import { methodNotFound, methodRequired, paramsRequired } from "./error";
import { jsonResponse } from "./json-response";

export const handlePOST = (request: any, response: any) => {
    let req_body: string;
    
    request.on('data', (data: any) => req_body = data);
    
    request.on('end', async () => {

      const { method, params } = JSON.parse(req_body);

      if (!method) return response.end(methodNotFound());
      if (!params) return response.end(paramsRequired());
  
      const { func } = find_method(method);
      if (func === null) return response.end(methodRequired());
  
      try {
        const response = await func(params);
        return response.end(jsonResponse({result: response, error: {}}));
      } catch(error) {
        return response.end(jsonResponse({result: {}, error}));
      }
    });
}