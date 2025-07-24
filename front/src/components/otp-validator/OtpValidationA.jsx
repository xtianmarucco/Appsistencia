import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserOtpConfigured, showOtpValidationModal, setLoading } from "../../store/slices/userSlice";

/**
 * OtpValidationA
 * @param {function} onSuccess - Callback que se ejecuta cuando el OTP es válido.
 * @param {string} title - Título opcional para personalizar el mensaje.
 */
export default function OtpValidationA({ onSuccess, title }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleValidation = async () => {
    setError("");
    dispatch(setLoading(true));
    try {
      const response = await fetch("http://localhost:3000/api/auth/validate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, otp_code: otp }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Código OTP inválido.");
      }

      dispatch(setUserOtpConfigured(true));
      dispatch(showOtpValidationModal());

      // Ejecuta el callback si se provee
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 300);
    }
  };

  return (
    <div className="flex min-h-[320px] min-w-[320px] items-center justify-center">
      <div className="bg-white pl-8 pb-8 pr-8  flex flex-col items-center w-full max-w-md">
        <h3 className="text-lg font-bold text-primary-dark mb-2 text-center">
          {title || "Ingresa el código de Google Authenticator"}
        </h3>
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
          Validar codigo
        </button>
      </div>
    </div>
  );
}