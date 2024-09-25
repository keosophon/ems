
import './App.css'
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'

function App() {
  
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Navigate to="/AdminDashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
        </Routes>
      
    
  </BrowserRouter>
  )
}

export default App
