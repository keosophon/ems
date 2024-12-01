import Salary from "../models/Salary.js";

export const addSalary = async (req, res) => {
  try {
    const { employeeId, salary, allowance, deductions, payDate } = req.body;
    console.log(employeeId, salary, allowance, deductions, payDate);
    const newSalary = new Salary({
      employeeId,
      salary,
      allowance,
      deductions,
      payDate,
    });
    await newSalary.save();
    res
      .status(201)
      .json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("Error adding salary:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.status(200).json({ success: true, data: salaries });
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res
        .status(404)
        .json({ success: false, message: "Salary not found" });
    }
    res.status(200).json({ success: true, data: salary });
  } catch (error) {
    console.error("Error fetching salary:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
