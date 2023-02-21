import { CacheLayer } from "./interface";
import { Redis } from "./redis-cache-layer";

/**
 * Stratergy Pattern to Select which caching layer to select and use.
 */
export default (() : CacheLayer => new Redis())()