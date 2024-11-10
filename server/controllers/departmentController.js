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

    //console.log({ departmentName, description });
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

// Get Department by ID
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the department by ID
    const department = await Department.findById(id);

    // Check if department exists
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    // Respond with department data
    //console.log(department);
    res.status(200).json({ success: true, data: department });
  } catch (error) {
    // Handle server error
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching department",
    });
  }
};

const updateDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { departmentName, description } = req.body;

    // Find the department by ID and update its details
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { departmentName, description },
      { new: true }
    );

    // Check if department exists
    if (!updatedDepartment) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    // Respond with updated department data
    return res.status(200).json({ success: true, data: updatedDepartment });
  } catch (error) {
    // Handle server error
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating department",
    });
  }
};

export {
  addDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentById,
};
