import CoinGeckoService from "./coin-gecko-service";
import { RateService } from "./interface";
import TestRateService from "./test-rate-service";

/**
 * Stratergy pattern to select what Rate service to use
 * 
 * If we are running a test use the test rate service to avoid api calls.
 */
export default (() : RateService => process.env.NODE_ENV === 'test' ? new TestRateService() : new CoinGeckoService())()