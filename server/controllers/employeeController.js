import Employee from "../models/Employee.js";
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

    const imageBuffer = req.file ? req.file.buffer : null;

    if (!imageBuffer) {
      return res.status(400).json({ message: "Image is required." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    // Create the new Employee object
    const newEmployee = new Employee({
      name: formData.name,
      email: formData.email,
      employeeID: formData.employeeID,
      DoB: new Date(formData.DoB), // Convert to Date object
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      Designation: formData.Designation,
      Department: formData.Department,
      salary: parseFloat(formData.salary),
      password: hashedPassword, // Store the hashed password
      role: formData.role,
      image: imageBuffer,
      imageType: req.file.mimetype, // e.g., 'image/png'
    });

    // Save the employee to the database
    const savedEmployee = await newEmployee.save();

    // Respond with success
    return res.status(201).json({
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

export { addEmployee };
