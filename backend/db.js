import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGODB_DB_NAME || "merchant_navy";

let client;
let database;

export const connectDB = async () => {
  if (database) return database;

  client = new MongoClient(uri);
  await client.connect();
  database = client.db(dbName);

  console.log(`MongoDB Connected: ${dbName}`);
  return database;
};

export const getCollection = (name) => {
  if (!database) {
    throw new Error("Database is not connected. Call connectDB() before using collections.");
  }
  return database.collection(name);
};

export const closeDB = async () => {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
  }
};

export const nextNumericId = async (collectionName, idField) => {
  const collection = getCollection(collectionName);
  const latest = await collection.findOne(
    {},
    {
      sort: { [idField]: -1 },
      projection: { [idField]: 1, _id: 0 },
    }
  );

  const currentMax = Number(latest?.[idField]);
  if (!Number.isFinite(currentMax)) return 1;
  return currentMax + 1;
};
