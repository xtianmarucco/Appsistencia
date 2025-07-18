import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../thunks/loginThunk";
import LoginForm from "../components/login-form/LoginForm";
import Loader from "../components/loader/Loader";

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
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 via-blue-500 to-cyan-400 text-primary-text">
      <Loader />
      <div className="flex flex-col items-center w-full">
        <nav className="w-full p-4 text-white"></nav>
        <LoginForm onSubmit={handleLogin} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Login;
