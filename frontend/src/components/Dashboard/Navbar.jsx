import React from 'react';
import { useAuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <div className="flex justify-between items-center shadow-md p-4 h-16 bg-teal-600">
      <div className="text-2xl font-bold text-white">
        Welcome, {user.name}
      </div>
      <button className=" text-white text-2xl font-bold px-4 py-2 rounded-md hover:bg-orange-700 transition">
        Log out
      </button>
    </div>
  );
}
