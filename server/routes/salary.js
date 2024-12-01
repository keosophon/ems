import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import { addSalary } from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", verifyController, addSalary);

export default router;
