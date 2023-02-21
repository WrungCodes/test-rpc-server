/**
 * Cache Layer is the interface which all cache must implement to be compliant.
 */
export interface CacheLayer {
   
    /**
     * establish connection with remote cache
     */
    connect() : Promise<void>
    
    /**
     * This function will check is a specfic key has been set in the cache
     * @param key string - key to check
     */
    check(key: string): Promise<boolean>;
    
    /**
     * This function retrieves data stored in the key on the cache
     * @param key string - key to retrieve
     */
    get(key: string) : Promise<any>;
    
    /**
     * 
     * @param key string - the key to save the data under
     * @param value any - the data to store
     * @param expireAfter number - the time to expire the data
     */
    put(key: string, value: any, expireAfter?: number) : Promise<void>;
    
    /**
     * This function deletes a key and value pair from the cache
     * @param key string - key to delete
     */
    delete(key: string) : Promise<boolean>;

    /**
     * cancel connection to remote cache
     */
    disconnect() : Promise<void>;
}