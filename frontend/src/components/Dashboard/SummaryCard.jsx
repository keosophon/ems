import React from 'react';

export default function SummaryCard({ icon, text, number, color}) {
  return (
    <div className="flex items-center bg-white rounded shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 px-2">
      <div className={`flex justify-center items-center ${color} text-white p-4 text-3xl`}>
        {icon}
      </div>
      <div className="p-4 flex flex-col justify-center">
        <p className="text-lg font-semibold text-gray-700">{text}</p>
        <p className="text-3xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
}
