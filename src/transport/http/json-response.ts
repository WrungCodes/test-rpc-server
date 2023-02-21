/**
 * This function returns the json form to be presented over the endpoint, it checks for the id and returns equivalent id sent
 * @param data data to be passed into response
 * @param id 
 * @returns 
 */
export const jsonResponse = (data = {}, id?: string) => id ? JSON.stringify({ jsonrpc: '2.0', id, ...data}) : JSON.stringify({ jsonrpc: '2.0', ...data});