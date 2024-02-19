import { MongoClient } from "mongodb";
import "dotenv/config";

const pass = process.env.MONGO_PASS;

console.log("pass:", pass);

export async function connectDatabase() {
  const client = await MongoClient.connect(
    //update the password field everytime trying to connect to Mongodb
    `mongodb+srv://hessamimen:${pass}@events.sisrjke.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
