import { createApp } from "./app.js";
import { config } from "./config/config.js";
import { logger } from "./utils/logger.js";

const app = createApp();

const server = app.listen(config.port, () => {
  logger.info(`API listening on port ${config.port}`);
});

const shutdown = (signal) => {
  logger.warn(`Received ${signal}, shutting down...`);
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
