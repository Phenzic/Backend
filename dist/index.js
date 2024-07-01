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
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const index_1 = __importDefault(require("./config/index"));
const database_1 = require("./config/database");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./config/logger"));
const PORT = index_1.default.PORT;
const keepAliveAgent = new http_1.default.Agent({ keepAlive: true });
const keepAliveSecureAgent = new https_1.default.Agent({ keepAlive: true });
const options = {
    hostname: "",
    port: PORT,
    path: "/",
    method: "GET",
    agent: keepAliveAgent || keepAliveSecureAgent,
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectDB)();
        logger_1.default.info("Connected");
        const req = http_1.default.request(options, (res) => {
            logger_1.default.info(`STATUS: ${res.statusCode}`);
            res.setEncoding("utf8");
            res.on("data", (chunk) => {
                logger_1.default.info(`BODY: ${chunk}`);
            });
        });
        req.on("error", (e) => {
            logger_1.default.error(`Problem with request: ${e.message}`);
        });
        req.end();
        app_1.default.listen(PORT, () => {
            logger_1.default.info(`Express server is listening on ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error("Error starting server:", error);
        process.exit(1);
    }
}))();
