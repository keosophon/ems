import "./App.css";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminDashboardSidebar from "./components/Dashboard/AdminDashboardSidebar";
import AdminSummary from "./components/Dashboard/AdminSummary";
import DepartmentList from "./components/Department/DepartmentList";
import AddNewDepartment from "./components/Department/AddNewDepartment";
import EditDepartment from "./components/Department/EditDepartment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/AdminDashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes role={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/AdminDashboard/DepartmentList"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/AdminDashboard/AddNewDepartment"
            element={<AddNewDepartment />}
          ></Route>
          <Route
            path="/AdminDashboard/EditDepartment/:id"
            element={<EditDepartment />}
          ></Route>
        </Route>
        <Route path="/employeeDashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
