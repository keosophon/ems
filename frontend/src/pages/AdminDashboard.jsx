import React from "react"
import { useAuthContext } from "../context/AuthContext"


const AdminDashboard = () => {
  
  const {user} = useAuthContext();
  return (
    <div>
      <h1>Admin Dashboard {user &&user?.name}</h1>
    </div>
  )
}

export default AdminDashboard
