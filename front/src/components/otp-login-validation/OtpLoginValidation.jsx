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

  // const handleValidation = async () => {
  //   setError("");
  //   dispatch(setLoading(true)); // 🔥 Activar Loader

  //   try {
  //     const response = await fetch("http://localhost:3000/api/auth/validate-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ user_id: user.id, otp_code: otp }),
  //     });

  //     const data = await response.json();

  //     if (!data.valid) {
  //       throw new Error(data.message || "Código OTP inválido.");
  //     }

  //     // ✅ Redirigir al usuario a la página de check-in/out
  //     navigate("/check-in-out");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //    finally{
  //     setTimeout(() => {
  //       dispatch(setLoading(false)); // 🔥 Desactivamos el Loader después de un pequeño delay
  //       // console.log("❌ Loader desactivado, isLoading:", isLoading);
  //     }, 300);      }
  // };

  const handleValidation = async () => {
    setError("");
    dispatch(setLoading(true));

    try {
      const response = await fetch("http://localhost:3000/api/auth/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, otp_code: otp }),
      });

      const text = await response.text(); // 🔥 Ver respuesta cruda antes de convertir a JSON
      console.log("🔍 Respuesta cruda del backend:", text);

      const data = JSON.parse(text); // 🔥 Convertimos a JSON manualmente

      if (!data.success) {
        throw new Error(data.message || "Código OTP inválido.");
      }

      // ✅ Redirigir al usuario a la página de check-in/out
      navigate("/check-in-out");
    } catch (err) {
      console.error("❌ Error en la validación OTP:", err);
      setError(err.message);
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 300);
    }
};


  return (
    <div className="flex min-h-[320px] min-w-[320px] items-center justify-center">
      <div className="bg-yellow-100 p-8 rounded-lg shadow-2xl flex flex-col items-center w-full max-w-md">
        <h3 className="text-lg font-bold text-primary-dark mb-2">Verificación OTP</h3>
        <p className="text-gray-600 mb-2 text-center">
          Ingresa el código de Google Authenticator para confirmar tu identidad.
        </p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary mb-2 text-center"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={handleValidation}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-primary w-full mt-2"
        >
          Confirmar OTP
        </button>
      </div>
    </div>
  );
}
