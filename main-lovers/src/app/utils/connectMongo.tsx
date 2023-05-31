import { MongoClient } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "DB_URI"');
}

const uri = process.env.DB_URI;
const options = {};

let client;
let connectMongo: Promise<MongoClient>;

client = new MongoClient(uri, options);
connectMongo = client.connect();

export default connectMongo;
