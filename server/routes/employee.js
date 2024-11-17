import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import { addEmployee } from "../controllers/employeeController.js";
import multer from "multer";

const employeeRouter = express.Router();
//const upload = multer();
const storage = multer.memoryStorage(); // Stores the file in memory as a buffer
const upload = multer({ storage });

employeeRouter.post(
  "/add",
  upload.single("image"),
  verifyController,

  addEmployee
);

export default employeeRouter;
