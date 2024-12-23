import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    email: "",
    department: "",
    salary: "",
  });
  const [departments, setDepartments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/employee/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        const employeeData = response.data.employee;
        setEmployee((prevData) => ({
          ...prevData,
          name: employeeData.userId.name,
          designation: employeeData.Designation,
          email: employeeData.userId.email,
          department: employeeData.Department.departmentName,
          salary: employeeData.salary,
        }));
      }
    } catch (error) {
      alert("Cannot get employee details", error);
    }
  };
  const fetchAllDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setDepartments(response.data.data);
      }
    } catch (error) {
      alert("Cannot get department", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchAllDepartments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/employee/update/${id}`,
        employee,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        alert("Employee updated successfully");
        navigate("/AdminDashboard/EmployeeList");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token invalid or expired
        alert("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login page
      } else {
        alert("Cannot update employee", error.message);
      }
    }
  };

  return (
    <div className=" bg-gray-100 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Employee</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation:
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={employee.designation}
              onChange={(e) =>
                setEmployee({ ...employee, designation: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department:
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={employee.department}
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department._id} value={department.departmentName}>
                  {department.departmentName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary:
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
