import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
export default function SummaryCard() {
  const user = useAuthContext();
  return (
    <div className="flex items-center bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 px-2">
      <div
        className={`flex justify-center items-center bg-teal-600 text-white p-4 text-3xl`}
      >
        <FaUser />
      </div>
      <div className="p-4 flex flex-col justify-center">
        <p className="text-lg font-semibold text-gray-700">Welcome Back</p>
        <p className="text-3xl font-bold text-gray-900">{user.name}</p>
      </div>
    </div>
  );
}
