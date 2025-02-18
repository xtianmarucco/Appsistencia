import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboardPage";
import EmployeeDashboard from "./pages/EmployeeDashboardPage";
import SetupOtpPage from "./pages/SetupOtpPage";
import CheckInOutPage from "./pages/CheckInOutPage";
import "./index.css";

const RouteLogger = () => {
  const location = useLocation();
  console.log("📍 Navegando a:", location.pathname);
  return null;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <RouteLogger />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
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
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
