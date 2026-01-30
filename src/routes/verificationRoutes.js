import { Router } from "express";
import { verifyUser } from "../controllers/verificationController.js";

export const verificationRoutes = Router();

verificationRoutes.post("/verify", verifyUser);
