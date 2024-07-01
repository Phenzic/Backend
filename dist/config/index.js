"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 8000,
    DB_NAME: process.env.MONGO_DB_NAME,
    DB_PW: process.env.MONGO_PW,
    DB_CLUSTER: process.env.MONGO_CLUSTER,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    MONGODB_URI_TEST: (_a = process.env.MONGODB_URI_TEST) !== null && _a !== void 0 ? _a : "",
    HOSTNAME: process.env.HOSTNAME,
};
