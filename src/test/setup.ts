import { MongoMemoryServer } from 'mongodb-memory-server';
import { RedisMemoryServer } from 'redis-memory-server';
import mongoose from 'mongoose';
import { createClient } from "redis";

let mongo: any;

let redisServer: any;
let redis: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoUri);

  redisServer = new RedisMemoryServer();
  const host = await redisServer.getHost();
  const port = await redisServer.getPort();

  process.env.REDIS_URI = `redis://${host}:${port}`
  process.env.ADMIN_API_KEY = 'testapikey'
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  redis = createClient({ url: process.env.REDIS_URI })
  redis.connect()
  await redis.flushAll()
  await redis.disconnect();
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();

  await redisServer.stop()
}, 1000000);
