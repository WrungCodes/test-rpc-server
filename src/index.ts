import { validateMongoDBConnection } from "./helpers/validate-mongodb-connection";
import { validateRedisDBConnection } from "./helpers/validate-redis-connection";
import { httpserver } from "./transport/http";
import * as dotenv from 'dotenv'

const start = async () => {

    dotenv.config()

    // validate external dependencies
    await validateMongoDBConnection()
    await validateRedisDBConnection()

    // initiate http transport layer
    const port = process.env.HTTP_PORT ?? '3000';
    httpserver.listen(parseInt(port), () => { console.log(`Listening on port ${port}`) });
};

start();
