import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';


let mongo: any;

jest.setTimeout(50000);

beforeAll(async () => {
  process.env.JWT_KEY = 'thisourjwtsecretitcouldbeanything';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();

  await mongoose.connection.close();
});
