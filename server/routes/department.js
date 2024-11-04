import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import { addDepartment } from "../controllers/departmentController.js";

const departmentRouter = express.Router();

departmentRouter.post("/add", verifyController, addDepartment);

export default departmentRouter;
