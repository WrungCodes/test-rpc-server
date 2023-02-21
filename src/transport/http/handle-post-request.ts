import { find_method } from ".";
import { methodNotFound, methodRequired, paramsRequired } from "./error";
import { handleInvalidRequest } from "./handle-invalid-request";
import { jsonResponse } from "./json-response";

/**
 * This function handles all post request and matches a method to its action .
 * @param request 
 * @param response 
 */
export const handlePOST = async (request: any, response: any) => {
    let req_body: string;
    
    // get the data on data received completely
    request.on('data', (data: any) => req_body = data);
    
    // once the request is done, start processing it
    request.on('end', async () => {

      // check if the body is defined and if not, this is an invalid request
      if(!req_body){
        return handleInvalidRequest(request, response)
      }
      
      const { id, method, params } = JSON.parse(req_body);

      // check if the method and param body is present, if not return corresponding error
      if (!method) return response.end(methodNotFound(id));
      if (!params) return response.end(paramsRequired(id));
  
      // look up the method same as the method passed in the payload
      const func = find_method(method);

      // if not found return an error
      if (!func) return response.end(methodRequired(id));
  
      /**
       * Run the method and return the result or error
       */
      try {
        const result = await func(request, response, params, id);
        return response.end(jsonResponse({result: result, error: null}, id));
      } catch(error) {
        return response.end(jsonResponse({result: null, error}, id));
      }
    });
}