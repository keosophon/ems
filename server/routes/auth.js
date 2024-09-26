import express from "express";

import {
  loginController,
  verifyController,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController);
router.get("/login", verifyController);

export default router;
