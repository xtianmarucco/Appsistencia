import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../thunks/authThunks";
import { setUser } from "../store/slices/userSlice"; // Asegúrate de importar esto
import LoginForm from "../components/login-form/LoginForm";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async ({ email, password }) => {
    setError("");

    try {
      const userData = await dispatch(loginUser({ email, password })).unwrap();

      console.log("✅ Login exitoso, datos recibidos:", userData);

      // 🔹 Guardamos los datos en Redux
      dispatch(setUser(userData));

      console.log("🛠 Estado actualizado en Redux - user_otp_configured:", userData.user_otp_configured);

      // 🔹 Redirigir según el rol y OTP
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/setup-otp");
      }
    } catch (error) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="p-4 bg-primary text-primary-text">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default Login;
