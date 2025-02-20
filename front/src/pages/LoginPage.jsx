import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../thunks/authThunks";
import { setUser, setLoading } from "../store/slices/userSlice"; // Asegúrate de importar esto
import LoginForm from "../components/login-form/LoginForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading); // ✅ Usamos useSelector para obtener el estado
  const [error, setError] = useState("");


    // 🔥 Verificar cambios en `isLoading`
    useEffect(() => {
      console.log("🔄 Cambio detectado en isLoading:", isLoading);
    }, [isLoading]);

  const handleLogin = async ({ email, password }) => {
    setError("");

    // 🔥 Activar el Loader
    dispatch(setLoading(true));
    console.log("🔥 Loader activado, isLoading:", isLoading); // ✅ Verificamos el estado

    try {
      const userData = await dispatch(loginUser({ email, password })).unwrap();

      // console.log("✅ Login exitoso, datos recibidos:", userData);

      // 🔹 Guardamos los datos en Redux
      dispatch(setUser(userData));

      // console.log("🛠 Estado actualizado en Redux - user_otp_configured:", userData.user_otp_configured);

      // 🔹 Redirigir según el rol y OTP
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/setup-otp");
      }
    } catch (error) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    } finally {
      // console.log("⏳ Esperando 500ms antes de desactivar el Loader...");
      setTimeout(() => {
        dispatch(setLoading(false)); // 🔥 Desactivamos el Loader después de un pequeño delay
        console.log("❌ Loader desactivado, isLoading:", isLoading);
      }, 300); 
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
