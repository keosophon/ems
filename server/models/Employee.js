import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  DoB: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"], // Predefined options
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married"],
    required: true,
  },
  Designation: {
    type: String,
    required: true,
    trim: true,
  },
  Department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0, // Ensure salary is non-negative
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
