import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserOtpConfigured, showOtpValidationModal } from "../../store/slices/userSlice";

export default function OtpValidation() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const showOtpModal = useSelector((state) => state.user.showOtpModal); // 🔥 Verificar estado

  console.log("🧐 Estado Redux - showOtpModal:", showOtpModal);

  const handleValidation = async () => {
    setError("");

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

      // ✅ Actualizar Redux
      dispatch(setUserOtpConfigured(true));

      // ✅ Activar el modal en Redux
      dispatch(showOtpValidationModal());
      console.log("🎉 OTP Validado, activando el modal...");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold text-primary-dark mb-2">
        Ingresa el código de Google Authenticator
      </h3>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-primary mb-2"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleValidation}
        className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary"
      >
        Confirmar OTP
      </button>
    </div>
  );
}
