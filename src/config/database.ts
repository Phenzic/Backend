import { MongoClient, Db } from "mongodb";
import logger from "./logger";
import config from "./index";

const uri = `mongodb+srv://${config.DB_NAME}:${config.DB_PW}@${config.DB_CLUSTER}/?retryWrites=true&w=majority&appName=MediLog`;

if (!uri) {
  throw new Error("DB_URI is undefined");
}

const client = new MongoClient(uri);
let db: Db;

const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
    logger.info("Connecting...");
    db = client.db("medilog");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    throw error;
  }
};

const getDB = (): Db => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};

const closeDB = async (): Promise<void> => {
  try {
    if (client) {
      await client.close();
      logger.info("MongoDB connection closed");
    }
  } catch (error) {
    logger.error("Error closing MongoDB connection:", error);
    throw error;
  }
};

export { getDB, connectDB, closeDB };
