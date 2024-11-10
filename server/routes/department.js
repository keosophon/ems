import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} from "../controllers/departmentController.js";

const departmentRouter = express.Router();

departmentRouter.post("/add", verifyController, addDepartment);
departmentRouter.get("/", verifyController, getAllDepartments);
departmentRouter.get("/:id", verifyController, getDepartmentById);
departmentRouter.put("/update/:id", verifyController, updateDepartmentById);
departmentRouter.delete("/delete/:id", verifyController, deleteDepartmentById);

export default departmentRouter;
