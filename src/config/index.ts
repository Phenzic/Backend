import dotenv from "dotenv";

dotenv.config();

const Config = {
  PORT: process.env.PORT || 8000,
  DB_NAME: process.env.MONGO_DB_NAME,
  DB_PW: process.env.MONGO_PW,
  DB_CLUSTER: process.env.MONGO_CLUSTER,
  JWT_SECRET: process.env.SECRET_KEY as string,
};

if (!Config.JWT_SECRET) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

export default Config;
