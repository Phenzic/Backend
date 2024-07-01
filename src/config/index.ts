import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5050,
  DB_NAME: process.env.MONGO_DB_NAME,
  DB_PW: process.env.MONGO_PW,
  DB_CLUSTER: process.env.MONGO_CLUSTER,
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
  MONGODB_URI_TEST: process.env.MONGODB_URI_TEST ?? "",
  HOSTNAME: process.env.HOSTNAME,
};