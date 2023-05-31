import { MongoClient } from "mongodb";

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "DB_URI"');
}

const uri = process.env.DB_URI;
const options = {};

let client;
let connectMongo: Promise<any>;

client = new MongoClient(uri, options);
connectMongo = client.connect();

export default connectMongo;
