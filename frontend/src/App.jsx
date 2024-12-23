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
import EmployeeList from "./components/Employee/EmployeeList";
import AddEmployee from "./components/Employee/AddEmployee";
import ViewEmployee from "./components/Employee/ViewEmployee";
import EditEmployee from "./components/Employee/EditEmployee";
import AddSalary from "./components/Salary/AddSalary";
import ViewSalary from "./components/Employee/ViewSalary";
import SummaryCard from "./components/EmployeeDashboard/SummaryCard";
import View from "./components/Employee/ViewEmployee";

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
            path="/AdminDashboard/EmployeeList"
            element={<EmployeeList />}
          />

          <Route
            path="/AdminDashboard/AddEmployee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/AdminDashboard/ViewEmployee/:id"
            element={<ViewEmployee />}
          ></Route>
          <Route
            path="/AdminDashboard/EditEmployee/:id"
            element={<EditEmployee />}
          ></Route>
          <Route
            path="/AdminDashboard/AddSalary"
            element={<AddSalary />}
          ></Route>
          <Route
            path="/AdminDashboard/Employees/Salary/:id"
            element={<ViewSalary />}
          ></Route>
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
        <Route
          path="/EmployeeDashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes role={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<SummaryCard />}></Route>
          <Route
            path="/EmployeeDashboard/Profile/:id"
            element={<View />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
