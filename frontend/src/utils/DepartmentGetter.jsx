import axios from "axios";

const getDepartment = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      console.log(response.data.data);
      return response.data.data;
    }
  } catch (error) {
    if (response.error && !response.error.data.success) {
      alert(error.response.data.error);
    }
    console.error("Error fetching departments:", error);
    return [];
  }
};

export default getDepartment;
