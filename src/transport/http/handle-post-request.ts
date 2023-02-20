import { find_method } from ".";
import { methodNotFound, methodRequired, paramsRequired } from "./error";
import { handleInvalidRequest } from "./handle-invalid-request";
import { jsonResponse } from "./json-response";

export const handlePOST = async (request: any, response: any) => {
    let req_body: string;
    
    request.on('data', (data: any) => req_body = data);
    
    request.on('end', async () => {

      if(!req_body){
        return handleInvalidRequest(request, response)
      }

      const { method, params } = JSON.parse(req_body);

      if (!method) return response.end(methodNotFound());
      if (!params) return response.end(paramsRequired());
  
      const func = find_method(method);

      if (!func) return response.end(methodRequired());
  
      try {
        const result = await func(params);
        return response.end(jsonResponse({result: result, error: {}}));
      } catch(error) {
        console.log(error)
        return response.end(jsonResponse({result: {}, error}));
      }
    });
}