import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "id",
    selector: (row) => row._id,
    sortable: true,
    wrap: true,
    maxWidth: "250px",
  },
  {
    name: "Name",
    selector: (row) => row.userId.name,
    sortable: true, // Enable sorting for this column
    wrap: true,
    maxWidth: "150px",
    center: true,
  },
  {
    name: "Image",
    selector: (row) => (
      <img
        src={`http://localhost:5000/uploads/${row.userId.profileImage}`}
        alt="Employee Profile"
        style={{ width: "50px", borderRadius: "50%" }}
      />
    ),
    sortable: true,
    wrap: true,
    maxWidth: "100px",
    center: true,
  },
  {
    name: "Department",
    selector: (row) => row.Department.departmentName,
    sortable: true, // Enable sorting for this column
    wrap: true,
    maxWidth: "150px",
    center: true,
  },
  {
    name: "DoB",
    selector: (row) => new Date(row.DoB).toLocaleDateString(),
    sortable: true, // Enable sorting for this column
    wrap: true,
    maxWidth: "100px",
    center: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    allowOverflow: true,
    center: true,
  },
];

export function ActionButtons({ id, onRefresh }) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, user may not be authenticated");
    alert("Please log in to continue");
    navigate("/login");
    return;
  }
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="bg-green-600 hover:bg-green-700 rounded text-xl text-white p-2 mr-2 "
        onClick={() => navigate(`/AdminDashboard/ViewEmployee/${id}`)}
      >
        View
      </button>
      <button
        className="bg-yellow-600 hover:bg-yellow-700 rounded text-xl text-white p-2 mr-2 "
        onClick={() => navigate(`/AdminDashboard/EditEmployee/${id}`)}
      >
        Edit
      </button>
      <button
        className="bg-blue-600 hover:bg-blue-700 rounded text-xl text-white p-2 mr-2 "
        onClick={() => navigate(`/AdminDashboard/Salary/${id}`)}
      >
        Saraly
      </button>
      <button
        className="bg-cyan-600 hover:bg-cyana-700 rounded text-xl text-white p-2"
        onClick={() => navigate(`/AdminDashboard/Leave/${id}`)}
      >
        Leave
      </button>
    </div>
  );
}
