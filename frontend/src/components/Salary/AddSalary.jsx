import React, { useEffect, useState } from "react";
import axios from "axios";

const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    department: "",
    employee: "",
    salary: "",
    allowance: "",
    deductions: "",
    payDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Fetch employees when a department is selected
    if (name === "department") {
      fetchEmployees(value);
      setFormData({ ...formData, employee: "", department: value }); // Reset employee selection
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to process the form data, such as sending it to a backend API
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchEmployees = async (department) => {
    console.log(department);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee?department=${department}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.employees);
      setEmployees(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Add Salary</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Select Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          >
            <option value="">Choose a department</option>
            {departments.map((department) => (
              <option key={department._id} value={department.departmentName}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="employee"
            className="block text-sm font-medium text-gray-700"
          >
            Select Employee
          </label>
          <select
            id="employee"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            disabled={!formData.department}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          >
            <option value="">Choose an employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee.name}>
                {employee.userId.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            placeholder="Enter salary"
          />
        </div>

        <div>
          <label
            htmlFor="allowance"
            className="block text-sm font-medium text-gray-700"
          >
            Monthly Allowance
          </label>
          <input
            type="number"
            id="allowance"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            placeholder="Enter allowance"
          />
        </div>

        <div>
          <label
            htmlFor="deductions"
            className="block text-sm font-medium text-gray-700"
          >
            Deductions
          </label>
          <input
            type="number"
            id="deductions"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            placeholder="Enter deductions"
          />
        </div>

        <div>
          <label
            htmlFor="payDate"
            className="block text-sm font-medium text-gray-700"
          >
            Pay Date
          </label>
          <input
            type="date"
            id="payDate"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
