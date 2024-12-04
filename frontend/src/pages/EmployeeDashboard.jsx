import React from "react";
import EmployeeDashboardSidebar from "../components/EmployeeDashboard/EmployeeDashboardSidebar";
import Navbar from "../components/Dashboard/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <EmployeeDashboardSidebar />
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
