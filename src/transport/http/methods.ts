/**
 * Simple map to store all methods for simple look up
 */
let methods = new Map<string, any>();

/**
 * This functions add methods to the map of methods
 * @param name the name of the function
 * @param func the func to add to methods
 */
export const add_method = (name: string, func: any) => { methods.set(name, func) }

/**
 * This function is used to find methods from the method map
 * @param name name of the method to retrieve
 * @returns 
 */
export const find_method = (name: string) => { return methods.get(name) }