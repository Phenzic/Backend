import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf((info: any) => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: 'combined.log' }),
    // new transports.File({ filename: 'error.log', level: 'error' })
  ],
});

export default logger;