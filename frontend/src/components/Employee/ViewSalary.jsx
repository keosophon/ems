import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewSalary = () => {
  const id = useParams().id;
  const [salary, setSalary] = useState([]);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/salary/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setSalary(response.data.salary);
        }
      } catch (error) {
        console.error("Error fetching salary of employee:", error);
      }
    };

    fetchSalary();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Salary Details for Employee</h2>
      {salary.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Salary ID
                </th>

                <th className="border border-gray-300 px-4 py-2 text-left">
                  Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Allowance
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Deductions
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Pay Date
                </th>
              </tr>
            </thead>
            <tbody>
              {salary.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {item._id}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    ${item.salary}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${item.allowance}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${item.deductions}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.payDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-red-500">
          No salary records found for this employee.
        </p>
      )}
    </div>
  );
};

export default ViewSalary;
