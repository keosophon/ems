import React from 'react'
import {Link} from 'react-router-dom'

export default function DepartmentList() {
  return (
    <div>
      <div className='mb-4 text-center'>
      <h3 className='text-3xl  font-bold'>Add New Department</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='search by department name' className='text-center text-lg rounded w-72' />
        <Link to="/AdminDashboard/AddNewDepartment" className='bg-orange-500 p-2 text-lg text-white hover:bg-orange-700 rounded'>Add New Department</Link>
      </div>
    </div>
  )
}
