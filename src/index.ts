import { validateCoinGeckoConnection } from "./helpers/validate-coingecko-connection";
import { validateMongoDBConnection } from "./helpers/validate-mongodb-connection";
import { validateRedisDBConnection } from "./helpers/validate-redis-connection";
import { seed } from "./seed";
import { httpserver } from "./transport/http";
import * as dotenv from 'dotenv'
dotenv.config()

const start = async () => {
    // validate external dependencies
    await validateMongoDBConnection()
    await validateRedisDBConnection()
    await validateCoinGeckoConnection()

    // run seed data
    await seed()

    // initiate http transport layer
    const port = process.env.HTTP_PORT ?? '3000';
    httpserver.listen(parseInt(port), () => { console.log(`Listening on port ${port}`) });
};

start();
