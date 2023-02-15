import mongoose from 'mongoose';
import { validateMongoDBConnection } from "./helpers/validate-mongodb-connection";
import { validateRedisDBConnection } from "./helpers/validate-redis-connection";
import { http } from "./transport/http/app";

const start = async () => {

    // validate external dependencies
    await validateMongoDBConnection()
    await validateRedisDBConnection()

    // initiate http transport layer (Express)
    const port = process.env.HTTP_PORT ?? 3000;
    http.listen(port, () => { console.log(`Listening on port ${port}`) });
};

start();
