import React, { useEffect, useState } from "react";
import axios from "axios";

const AddSalary = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: null,
    salary: 0,
    allowance: 0,
    deductions: 0,
    payDate: null,
  });

  const fetchEmployees = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/department/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data.employees);
        setEmployees(response.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(formData);
  };

  const handleDepartment = (e) => {
    fetchEmployees(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Form Data Submitted:", formData);
    // Add logic to process the form data, such as sending it to a backend API

    try {
      const response = axios.post(
        "http://localhost:5000/api/salary/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data && response.data.success) {
        console.log(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding salary:", error);
      alert("Error adding salary");
      console.log({
        employeeId: formData.employeeId,
        salary: formData.salary,
        allowance: formData.allowance,
        deductions: formData.deductions,
        payDate: formData.payDate,
      });
    }
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
            onChange={handleDepartment}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          >
            <option value="">Choose a department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium text-gray-700"
          >
            Select Employee
          </label>
          <select
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            //disabled={!formData.department}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-lg p-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
          >
            <option value="">Choose an employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
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
            className="w-full py-4 px-6 bg-orange-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
