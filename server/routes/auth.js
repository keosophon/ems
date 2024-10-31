import express from "express";

import { loginController, verify } from "../controllers/authController.js";

import { verifyController } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/verify", verifyController, verify);

export default router;
