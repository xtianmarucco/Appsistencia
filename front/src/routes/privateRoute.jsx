import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

const PrivateRoute = ({ children, requiredRole }) => {
  const role = useSelector((state) => state.user.role);
  const userOtpConfigured = useSelector((state) => state.user.user_otp_configured);
  const location = useLocation(); // Obtener la URL actual
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Solo cambiar isLoading si role es null o un string válido
    if (typeof role === "string" && role.length > 0) {
      setIsLoading(false);
    }
    // Si el usuario no está logueado, también desactiva el loading
    if (role === null) {
      setIsLoading(false);
    }
  }, [role]);

  // console.log("🚀 PrivateRoute - Role:", role);
  // console.log("🔐 PrivateRoute - Required Role:", requiredRole);
  // console.log("🔑 PrivateRoute - OTP Configured:", userOtpConfigured);
  // console.log("📍 Ubicación actual:", location.pathname);
  // console.log("⏳ Loading State:", isLoading);

  if (isLoading) {
    return <Loader/>; // Evita redirecciones prematuras
  }

  if (!role) {
    // console.log("⛔ Redirigiendo al login...");
    return <Navigate to="/login" replace />;
  }

  if (role === "employee" && !userOtpConfigured) {
    // 🚀 Evitar redirección infinita si ya estamos en "/setup-otp"
    if (location.pathname !== "/setup-otp") {
      // console.log("🔄 Redirigiendo a setup-otp...");
      return <Navigate to="/setup-otp" replace />;
    }
  }

  // console.log("✅ Renderizando página dentro de PrivateRoute.");
  return children;
};

export default PrivateRoute;