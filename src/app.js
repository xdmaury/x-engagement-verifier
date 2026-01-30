import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { verificationRoutes } from "./routes/verificationRoutes.js";
import { logger } from "./utils/logger.js";

export const createApp = () => {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors({ origin: true }));
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      limit: 60,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  app.use(express.json({ limit: "100kb" }));

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api", verificationRoutes);

  app.use((req, res) => {
    res.status(404).json({ ok: false, message: "Route not found" });
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    logger.error("Unhandled error", { error: err?.message });
    res.status(500).json({ ok: false, message: "Internal server error" });
  });

  return app;
};
