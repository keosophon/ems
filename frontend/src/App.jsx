
import './App.css'
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'

function App() {
  
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Navigate to="/AdminDashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={
            <PrivateRoutes>
              <RoleBasedRoutes role={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>} />
          <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
        </Routes>
      
    
  </BrowserRouter>
  )
}

export default App
