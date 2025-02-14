import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserOtpConfigured } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../validate-success-modal/OtpValidateModal";


export default function OtpValidation() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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

      // ✅ Si el OTP es válido, actualizamos Redux
      dispatch(setUserOtpConfigured(true));

      // ✅ Mostrar el modal de éxito
      setSuccess(true);
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

      {/* Modal de éxito */}
      {success && <SuccessModal />}
    </div>
  );
}

