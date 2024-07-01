import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  DB_NAME: process.env.MONGO_DB_NAME,
  DB_PW: process.env.MONGO_PW,
  DB_CLUSTER: process.env.MONGO_CLUSTER,
};
