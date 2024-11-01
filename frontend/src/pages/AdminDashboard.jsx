import React from "react";
import AdminDashboardSidebar from "../components/AdminDashboardSidebar";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminDashboardSidebar />

      {/* Main content area */}
      <div className="flex-1  flex flex-col bg-gray-100">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main dashboard content */}
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
          <p>Welcome to the admin dashboard! Here is where main content will go.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
