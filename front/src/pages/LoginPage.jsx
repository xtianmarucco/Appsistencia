import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../thunks/loginThunk";
import LoginForm from "../components/login-form/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accede al estado global
  const { user, isLoading, error } = useSelector((state) => state.user);

  // 🔄 Navega según rol/OTP luego de login exitoso
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        // Si no tiene OTP configurado lo mandás a setup, si sí lo tiene lo mandás al dashboard/checkin
        if (user.user_otp_configured) {
          navigate("/check-in-out");
        } else {
          navigate("/setup-otp");
        }
      }
    }
  }, [user, navigate]);

  const handleLogin = async ({ email, password }) => {
    // El loader y el error lo maneja el thunk
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="p-4 bg-primary text-primary-text">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
    <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />

      {/* Mostrar error global si existe */}
      {error && <p className="text-red-600 mt-2">{error}</p>}
      {/* Mostrar loading si está cargando */}
      {isLoading && <p className="text-gray-400">Cargando...</p>}
    </div>
  );
};

export default Login;
