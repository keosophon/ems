import React from "react";
import AdminDashboardSidebar from "../components/Dashboard/AdminDashboardSidebar";
import Navbar from "../components/Dashboard/Navbar";
import AdminSummary from "../components/Dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <AdminDashboardSidebar />
      <div className="flex-1  flex flex-col bg-gray-100">
        <Navbar />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
