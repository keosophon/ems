import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
} from "../controllers/departmentController.js";

const departmentRouter = express.Router();

departmentRouter.post("/add", verifyController, addDepartment);
departmentRouter.get("/", verifyController, getAllDepartments);
departmentRouter.get("/:id", verifyController, getDepartmentById);

export default departmentRouter;
