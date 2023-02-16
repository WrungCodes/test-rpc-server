export interface CacheLayer {
   
    connect() : Promise<void>
    
    check(key: string): Promise<boolean>;
    
    get(key: string) : Promise<any>;
    
    put(key: string, value: any, expireAfter?: number) : Promise<void>;
    
    disconnect() : Promise<void>;
}