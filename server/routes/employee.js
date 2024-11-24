import express from "express";
import { verifyController } from "../middleware/authMiddleware.js";
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
} from "../controllers/employeeController.js";
import multer from "multer";

const employeeRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

employeeRouter.post(
  "/add",
  upload.single("image"),
  verifyController,
  addEmployee
);

employeeRouter.get("/", verifyController, getEmployees);

employeeRouter.get("/:id", verifyController, getEmployeeById);
employeeRouter.put("/update/:id", verifyController, updateEmployeeById);

export default employeeRouter;
