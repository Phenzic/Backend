"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const myFormat = printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(colorize(), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        // new transports.File({ filename: 'combined.log' }),
        // new transports.File({ filename: 'error.log', level: 'error' })
    ],
});
exports.default = logger;
