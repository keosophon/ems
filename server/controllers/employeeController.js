import Employee from "../models/Employee.js";
import User from "../models/User.js";
import Department from "../models/Department.js";
import bcrypt from "bcrypt";

// Controller to add a new department
const addEmployee = async (req, res) => {
  try {
    // Extract form data from request
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    const user = await User.findOne({ email: formData.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const newUser = new User({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    // Create the new Employee object
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeID: formData.employeeID,
      DoB: new Date(formData.DoB), // Convert to Date object
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      Designation: formData.Designation,
      Department: formData.Department,
      salary: parseFloat(formData.salary),
    });

    // Save the employee to the database
    const savedEmployee = await newEmployee.save();

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Employee added successfully.",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error("Error in addEmployeeController:", error);

    // Respond with an error message
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add employee.",
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId")
      .populate("Department");
    console.log(employees);
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Error in getEmployeesController:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch employees.",
    });
  }
};

export { addEmployee, getEmployees };
