"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Config = {
    PORT: process.env.PORT || 8000,
    DB_NAME: process.env.MONGO_DB_NAME,
    DB_PW: process.env.MONGO_PW,
    DB_CLUSTER: process.env.MONGO_CLUSTER,
    JWT_SECRET: process.env.SECRET_KEY,
};
if (!Config.JWT_SECRET) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}
exports.default = Config;
