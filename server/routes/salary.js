import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import {
  addSalary,
  getSalaryByEmployeeId,
} from "../controllers/salaryController.js";

const router = express.Router();

router.post("/add", verifyController, addSalary);
router.get("/employee/:id", verifyController, getSalaryByEmployeeId);

export default router;
