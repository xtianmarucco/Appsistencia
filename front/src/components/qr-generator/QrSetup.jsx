import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import { setupOtp } from "../../services/otpService";

// Asegúrate de que esta ruta sea correcta
export default function QrSetup({ onScanned }) {
  const user = useSelector((state) => state.user.user);
  const [otpUri, setOtpUri] = useState(null);

  useEffect(() => {
    const fetchOtpUri = async () => {
      if (!user) return;
      try {
        const { otpAuthUrl } = await setupOtp(user.id);
        setOtpUri(otpAuthUrl);
      } catch (error) {
        console.error("❌ Error al obtener la URL del QR:", error);
      }
    };
    fetchOtpUri();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">
        Escanea este código QR con Google Authenticator
      </h3>
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
