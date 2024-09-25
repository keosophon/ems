import React from "react"
//import { useAuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react" 
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://localhost:8000/verify", {
        headers: { Authorization: token },
      });
      setUser(res.data.decoded);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <div>
        {!user ? (
          <div>
            <h3 style={{ textAlign: "center", color: "white" }}>
              Access Denied!
              <p>
                Please <a href="./login">Login</a> First
              </p>
            </h3>
          </div>
        ) : (
          <div>
            <h3 style={{ textAlign: "center", color: "white" }}>
              {user.name} Welcome to Admin Dashboard
              <p>
                <Link to="/login" onClick={() => localStorage.clear()}>
                  Logout
                </Link>
              </p>
            </h3>
          </div>
        )}
      </div>
    </div>
  );  
}

export default AdminDashboard
