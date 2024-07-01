"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    PORT: process.env.PORT || 8000,
    DB_NAME: process.env.MONGO_DB_NAME,
    DB_PW: process.env.MONGO_PW,
    DB_CLUSTER: process.env.MONGO_CLUSTER,
};
