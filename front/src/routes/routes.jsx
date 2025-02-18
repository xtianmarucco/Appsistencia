import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Login from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboardPage";
import EmployeeDashboard from "../pages/EmployeeDashboardPage";
import SetupOtpPage from "../pages/SetupOtpPage";
import CheckInOutPage from "../pages/CheckInOutPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute requiredRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoute requiredRole="employee">
            <EmployeeDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/setup-otp"
        element={
          <PrivateRoute requiredRole="employee">
            <SetupOtpPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/check-in-out"
        element={
          <PrivateRoute requiredRole="employee">
            <CheckInOutPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
