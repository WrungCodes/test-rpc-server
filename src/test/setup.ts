import { MongoMemoryServer } from 'mongodb-memory-server';
import { RedisMemoryServer } from 'redis-memory-server';
import mongoose from 'mongoose';

let mongo: any;
let redis: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = mongo.getUri();
  
  await mongoose.connect(mongoUri);

  redis = new RedisMemoryServer();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

  redis.stop()
  redis.start()
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();

  await redis.stop();
}, 1000000);
