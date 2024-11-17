import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Valid email format
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
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0, // Ensure salary is non-negative
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum password length
    },
    role: {
      type: String,
      enum: ["Admin", "Employee"], // Example roles
      required: true,
    },
    image: {
      type: Buffer, // Storing file as binary data
      required: true, // MIME type, e.g., 'image/jpeg'
    },
    imageType: {
      type: String, // To store contentType (e.g., 'image/png')
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
