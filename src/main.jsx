import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./routes/privateRoute";
import App from "./App";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import SetupOtp from "./pages/SetupOtp";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
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
                <SetupOtp />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
