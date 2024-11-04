import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddNewDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!departmentName || !description) {
      alert('Please fill in all fields');
      return;
    }

      // Get token from local storage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found, user may not be authenticated");
      alert("Please log in to continue");
      return; // Exit if token is missing
    }

    // Submit form data    
    try {
      const response = await axios.post('http://localhost:5000/api/department/add', {departmentName, description}, {
        headers: { "Authorization": `Bearer ${token }`}});


        if (response.data.success) {          
          navigate('/AdminDashboard/DepartmentList');
        }

        else {
          console.error("Failed to add department:", response.data);
          alert(response.data.message || "Failed to add department");
        }
    } catch (error) {
      //console.error("Error in POST request:", error.response?.data || error.message);
      if (error.response) {
          alert("Server Error: " + (error.response.data.message || error.response.data.error || "Could not add department"));
      } else {
          alert("Request failed: Could not connect to server");
      }
  }
    // Reset fields after submission
    setDepartmentName('');
    setDescription('');
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 ">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Department</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="departmentname" className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              id="departmentname"
              type="text"
              placeholder="Department name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
