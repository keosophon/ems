import Department from "../models/Department.js";

// Controller to add a new department
const addDepartment = async (req, res) => {
  const { departmentName, description } = req.body;
  //console.log({ departmentName, description });

  try {
    // Check if department already exists
    const existingDepartment = await Department.findOne({ departmentName });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists" });
    }

    // Create a new Department
    const newDepartment = new Department({
      departmentName,
      description,
    });

    console.log({ departmentName, description });
    // Save the new department to the database
    const savedDepartment = await newDepartment.save();
    return res.status(200).json({
      success: true,
      message: "Department added successfully",
      department: savedDepartment,
    });
  } catch (error) {
    console.error("Error adding department:", error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    // Retrieve all departments from the database
    const departments = await Department.find();

    // Send success response with the departments data
    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addDepartment, getAllDepartments };
