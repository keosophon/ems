import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewEmployee() {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("hello");
        if (response.data.success) {
          setEmployee(response.data.employee);
          //console.log(response.data.employee);
        }
      } catch (error) {
        alert("Error viewing employee", error);
        console.error("Error viewing employee:", error);
      }
    };

    fetchEmployee();
  }, [id, token]);

  return (
    <div className="flex justify-center bg-gray-100 p-6">
      {employee ? (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Employee Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="flex items-center justify-center">
              <img
                src={`http://localhost:5000/uploads/${employee.userId.profileImage}`}
                alt="Employee"
                className="w-48 h-48 rounded-full object-cover border-2 border-gray-300"
              />
            </div>

            {/* Information Section */}
            <div>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">ID:</span> {employee._id}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Name:</span>{" "}
                {employee.userId.name}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Gender:</span> {employee.gender}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">DoB:</span>{" "}
                {new Date(employee.DoB).toLocaleDateString()}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Email:</span>{" "}
                {employee.userId.email}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Department:</span>{" "}
                {employee.Department.departmentName}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Designation:</span>{" "}
                {employee.Designation}
              </p>

              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Salary:</span> {employee.salary}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">Role:</span>{" "}
                {employee.userId.role}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading...hello</p>
      )}
    </div>
  );
}
