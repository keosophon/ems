import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getAllDepartments,
} from "../controllers/departmentController.js";

const departmentRouter = express.Router();

departmentRouter.post("/add", verifyController, addDepartment);
departmentRouter.get("/", verifyController, getAllDepartments);

export default departmentRouter;
