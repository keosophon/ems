import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  { name: "id", selector: (row) => row._id },
  {
    name: "Department Name",
    selector: (row) => row.departmentName,
    sortable: true, // Enable sorting for this column
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Updated At",
    selector: (row) => new Date(row.updatedAt).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
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
  const handleDelete = async () => {
    let userConfirmation = confirm(
      "Are you sure you want to delete this department?"
    );
    if (userConfirmation) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/department/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          onRefresh(); // Refresh the list
        }
      } catch (error) {
        console.error(error);
        alert("Failed to delete department");
      }
    }
  };
  return (
    <div>
      <button
        className="bg-green-600 hover:bg-green-700 rounded text-xl text-white p-2 mr-2 "
        onClick={() => navigate(`/AdminDashboard/EditDepartment/${id}`)}
      >
        Edit
      </button>
      <button
        className="bg-red-600 hover:bg-red-700 rounded text-xl text-white p-2"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
