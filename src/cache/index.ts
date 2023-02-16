import { CacheLayer } from "./interface";
import { Redis } from "./redis-cache-layer";

export default (() : CacheLayer => new Redis())()