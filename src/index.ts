import http from "http";
import https from "https";
import config from "./config/index";
import { connectDB } from "./config/database";
import app from "./app";
import logger from "./config/logger";

const PORT = config.PORT;

const keepAliveAgent = new http.Agent({ keepAlive: true });
const keepAliveSecureAgent = new https.Agent({ keepAlive: true });

const options = {
  hostname: "",
  port: PORT,
  path: "/",
  method: "GET",
  agent: keepAliveAgent || keepAliveSecureAgent,
};

(async () => {
  try {
    await connectDB();
    logger.info("Connected");

    const req = http.request(options, (res) => {
      logger.info(`STATUS: ${res.statusCode}`);
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        logger.info(`BODY: ${chunk}`);
      });
    });

    req.on("error", (e) => {
      logger.error(`Problem with request: ${e.message}`);
    });

    req.end();

    app.listen(PORT, () => {
      logger.info(`Express server is listening on ${PORT}`);
    });
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }
})();
