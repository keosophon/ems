import React from "react"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  
  const {user, loading} = useAuthContext();
  const navigate = useNavigate();

  if (loading) {
    return <div>loading...</div>
  }
  
  if (!user) {
    navigate('/login');
  }
  return (
    <div>
      <h1>Admin Dashboard {user && user.name}</h1>
    </div>
  )
}

export default AdminDashboard
