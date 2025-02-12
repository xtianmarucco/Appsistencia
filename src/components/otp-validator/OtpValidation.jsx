import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateOtp } from "../../services/otpService";
import { setUserOtpConfigured } from "../../store/slices/userSlice";
import { supabase } from "../../lib/supabaseClient";

export default function OtpValidation({ onSuccess }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleValidation = async () => {
    setError("");

    try {
      const isValid = validateOtp(user.otp_secret, otp);
      if (!isValid) {
        throw new Error("Código OTP inválido.");
      }

      // Actualizar estado en la BD
      await supabase.from("users").update({ user_otp_configured: true }).eq("id", user.id);
      
      // Actualizar estado en Redux
      dispatch(setUserOtpConfigured(true));

      onSuccess(); // Llamar a la función del padre para avanzar
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
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Confirmar
      </button>
    </div>
  );
}
