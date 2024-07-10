"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDB = exports.connectDB = exports.getDB = void 0;
const mongodb_1 = require("mongodb");
const logger_1 = __importDefault(require("./logger"));
const index_1 = __importDefault(require("./index"));
const uri = `mongodb+srv://${index_1.default.DB_NAME}:${index_1.default.DB_PW}@${index_1.default.DB_CLUSTER}/?retryWrites=true&w=majority&appName=MediLog`;
if (!uri) {
    throw new Error("DB_URI is undefined");
}
const client = new mongodb_1.MongoClient(uri);
let db;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        logger_1.default.info("Connecting...");
        db = client.db("medilog");
    }
    catch (error) {
        logger_1.default.error(`Error connecting to MongoDB: ${error}`);
        throw error;
    }
});
exports.connectDB = connectDB;
const getDB = () => {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
};
exports.getDB = getDB;
const closeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (client) {
            yield client.close();
            logger_1.default.info("MongoDB connection closed");
        }
    }
    catch (error) {
        logger_1.default.error("Error closing MongoDB connection:", error);
        throw error;
    }
});
exports.closeDB = closeDB;
