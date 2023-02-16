import CoinGeckoService from "./coin-gecko-service";
import { RateService } from "./interface";

export default (() : RateService => new CoinGeckoService())()