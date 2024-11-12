import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

export default function AdminDashboardSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="bg-teal-600 text-2xl font-bold text-center py-4">EMS</div>
      <div className="flex flex-col space-y-2 px-4">
        <NavLink
          to="/AdminDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-orange-700 rounded-md mt-5 py-3 px-4 transition-colors ${
              isActive ? "bg-orange-700 text-white" : ""
            } `
          }
          end
        >
          <FaTachometerAlt className="text-lg" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/EmployeeList"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-orange-700 rounded-md py-3 px-4 transition-colors ${
              isActive ? "bg-orange-700 text-white" : ""
            }
                `
          }
        >
          <FaUser className="text-lg" />
          <span>Employees</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/DepartmentList"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-orange-700 rounded-md py-3 px-4 transition-colors ${
              isActive ? "bg-orange-700 text-white" : ""
            }`
          }
        >
          <FaBuilding className="text-lg" />
          <span>Department</span>
        </NavLink>
        <NavLink
          to="/LeavesDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-orange-700 rounded-md py-3 px-4 transition-colors ${
              isActive ? "bg-orange-700 text-white" : ""
            }`
          }
        >
          <FaCalendarAlt className="text-lg" />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/SalaryDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-orange-700 rounded-md py-3 px-4 transition-colors ${
              isActive ? "bg-orange-700 text-white" : ""
            }`
          }
        >
          <FaMoneyBillWave className="text-lg" />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/SettingsDashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-orange-700 rounded-md py-3 px-4 transition-colors ${
              isActive ? "bg-orange-700 text-white" : ""
            }`
          }
        >
          <FaCog className="text-lg" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}
