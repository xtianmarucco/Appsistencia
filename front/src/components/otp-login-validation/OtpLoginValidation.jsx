import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../store/slices/userSlice";


export default function OtpLoginValidation() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleValidation = async () => {
    setError("");
    dispatch(setLoading(true)); // 🔥 Activar Loader

    try {
      const response = await fetch("http://localhost:3000/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, otp }),
      });

      const data = await response.json();

      if (!data.valid) {
        throw new Error(data.message || "Código OTP inválido.");
      }

      // ✅ Redirigir al usuario a la página de check-in/out
      navigate("/check-in-out");
    } catch (err) {
      setError(err.message);
    }
     finally{
      setTimeout(() => {
        dispatch(setLoading(false)); // 🔥 Desactivamos el Loader después de un pequeño delay
        console.log("❌ Loader desactivado, isLoading:", isLoading);
      }, 500);      }
  };

  return (
    <div className="bg-yellow-100 p-4 rounded shadow-md">
      <h3 className="text-lg font-bold text-primary-dark mb-2">
        Verificación OTP
      </h3>
      <p className="text-gray-600 mb-2">
        Ingresa el código de Google Authenticator para confirmar tu identidad.
      </p>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary mb-2"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleValidation}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-primary"
      >
        Confirmar OTP
      </button>
    </div>
  );
}
