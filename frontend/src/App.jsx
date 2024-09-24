
import './App.css'
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Navigate to="/AdminDashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
      
    
  </BrowserRouter>
  )
}

export default App
