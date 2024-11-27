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
      password: hashedPassword,
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
      .populate("userId", { password: 0 })
      .populate("Department");
    //console.log(employees);
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

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("userId", { password: 0 })
      .populate("Department");
    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Error in getEmployeeByIdController:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch employee.",
    });
  }
};

const updateEmployeeById = async (req, res) => {
  const { id } = req.params;
  const { name, designation, email, department, salary } = req.body;

  const employee = await Employee.findById(id);
  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  }

  const user = await User.findById(employee.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  user.name = name;
  user.email = email;
  await user.save();

  employee.Designation = designation;
  employee.salary = salary;
  if (department) {
    const departmentDoc = await Department.findOne({
      departmentName: department,
    });
    if (!departmentDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    employee.Department = departmentDoc._id; // Update with the new department ID
  }
  await employee.save();

  res
    .status(200)
    .json({ success: true, message: "Employee updated successfully" });
};

const getEmployeesByDepartment = async (req, res) => {
  const { id } = req.params; // Get the department name from query parameters
  //console.log(department);
  try {
    const employees = await Employee.find({ Department: id }).populate(
      "userId",
      { password: 0 }
    );
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Error in getEmployeeByIdController:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch employee.",
    });
  }
};

export {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  getEmployeesByDepartment,
};
