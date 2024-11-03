import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'

export default function AdminSummary() {
  return (
    <div className='p-6'>
      <h3 className="text-2xl text-center font-bold mb-4">Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon= {<FaUser />} text={"Total Employee"} number={13} color={"bg-orange-400"}/>
        <SummaryCard icon= {<FaBuilding />} text={"Total Departments"} number={50} color={"bg-yellow-400"}/>
        <SummaryCard icon= {<FaMoneyBillWave />} text={"Total Salary"} number={100} color={"bg-green-400"}/>
      </div>
      <div className='mt-16'>
      <h3 className="text-center text-2xl font-bold ">Leave Details</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon= {<FaFileAlt />} text={"Leave Applied"} number={13} color={"bg-red-400"}/>
        <SummaryCard icon= {<FaCheckCircle />} text={"Leave Approved"} number={50} color={"bg-violet-400"}/>
        <SummaryCard icon= {<FaHourglassHalf />} text={"Leave Pending"} number={100} color={"bg-pink-400"}/>
        <SummaryCard icon= {<FaTimesCircle />} text={"Leave Reject"} number={100} color={"bg-blue-400"}/>
      </div>
      </div>
    </div>
    
  )
}
