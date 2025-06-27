import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { generateOTPAuthURI } from "../../services/otpService";

export default function QrSetup({ onScanned }) {
  const user = useSelector((state) => state.user.user);
  const [otpUri, setOtpUri] = useState(null);

  useEffect(() => {
    const fetchOtpSecret = async () => {
      if (!user) return;

      try {
        const response = await fetch("http://localhost:3000/api/auth/setup-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        });

        const data = await response.json();
        console.log("📥 Respuesta del servidor en QrSetup:", data);

        if (!data.secret) {
          throw new Error("No se recibió una clave secreta para OTP.");
        }

        setOtpUri(generateOTPAuthURI(user.email, data.secret));
      } catch (error) {
        console.error("❌ Error al obtener el secreto OTP:", error);
      }
    };

    fetchOtpSecret();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">Escanea este código QR con Google Authenticator</h3>
      {otpUri ? (
        <QRCodeCanvas value={otpUri} size={200} />
      ) : (
        <p>Cargando QR...</p>
      )}
      <button
        onClick={onScanned}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ya escaneé el QR
      </button>
    </div>
  );
}
