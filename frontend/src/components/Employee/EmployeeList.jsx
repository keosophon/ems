import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ActionButtons, columns } from "./Columns";
export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilterEmployees] = useState([]);
  const navigate = useNavigate();

  // Get token from local storage
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, user may not be authenticated");
    alert("Please log in to continue");
    navigate("/login"); // Redirect to login if no token
    return;
  }

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        console.log(response.data);
        const data = response.data.employees.map((employee) => ({
          ...employee,
          action: <ActionButtons id={employee._id} onRefresh={handleRefresh} />,
        }));
        setEmployees(data);
        setFilterEmployees(data); // Adjust to response structure
      }
    } catch (error) {
      //alert(error.response.data.error);

      console.error("Error fetching employee:", error);
    }
  };

  useEffect(() => {
    // Fetch departments data from your server
    fetchEmployees();
  }, [navigate]);

  const handleRefresh = () => {
    fetchEmployees();
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-3xl font-bold">Add New Employee</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="search by employee name"
          className="text-center text-lg rounded w-72"
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filtered = employees.filter((emp) =>
              emp.employeeName.toLowerCase().includes(searchTerm)
            );
            setFilterEmployees(filtered);
          }}
        />
        <Link
          to="/AdminDashboard/AddEmployee"
          className="bg-orange-500 p-2 text-lg text-white hover:bg-orange-700 rounded"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination // Enables pagination
          highlightOnHover
          selectableRows // Optional: enables row selection
          striped // Optional: adds striped rows
          responsive // Makes the table responsive
        />
      </div>
    </div>
  );
}
