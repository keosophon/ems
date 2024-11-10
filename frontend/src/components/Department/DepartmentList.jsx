import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { ActionButtons, columns } from "./Columns";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Get token from local storage
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, user may not be authenticated");
    alert("Please log in to continue");
    navigate("/login"); // Redirect to login if no token
    return;
  }

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/department", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        const data = response.data.data.map((dep) => ({
          ...dep,
          action: <ActionButtons id={dep._id} onRefresh={handleRefresh} />,
        }));
        setDepartments(data); // Adjust to response structure
      }
    } catch (error) {
      if (response.error && !response.error.data.success) {
        alert(error.response.data.error);
      }
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    // Fetch departments data from your server
    fetchDepartments();
  }, [navigate]);

  const handleRefresh = () => {
    fetchDepartments();
  };

  return (
    <div>
      <div className="mb-4 text-center">
        <h3 className="text-3xl font-bold">Add New Department</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="search by department name"
          className="text-center text-lg rounded w-72"
        />
        <Link
          to="/AdminDashboard/AddNewDepartment"
          className="bg-orange-500 p-2 text-lg text-white hover:bg-orange-700 rounded"
        >
          Add New Department
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={departments}
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
