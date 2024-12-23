import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, user may not be authenticated");
    alert("Please log in to continue");
    navigate("/login"); // Redirect to login if no token
    return;
  }

  useEffect(() => {
    // Fetch the department data by ID when component mounts

    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data);
        //alert(response.data.data);
        setDepartmentData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching department data");
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Handles input change event. Updates state with new value.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   * @returns {void}
   */
  /******  7e8955b7-fee8-4f11-8665-5fcdaaf8a788  *******/
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setDepartmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/update/${id}`,
        departmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
    } catch (error) {
      console.error("Error updating department:", error.stack);
      setError("Error updating department");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (success) {
    setTimeout(() => {
      setSuccess(false);
      navigate("/AdminDashboard/DepartmentList"); // Redirect to department list after 3 seconds
    }, 1000);
    return (
      <p className="text-green-500 text-size-2xl pb-3">
        Department updated successfully
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Edit Department</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="departmentName"
            value={departmentData.departmentName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={departmentData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditDepartment;
