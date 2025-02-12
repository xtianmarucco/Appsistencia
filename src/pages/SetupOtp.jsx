import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import QrSetup from "../components/qr-generator/QrSetup";
import OtpValidation from "../components/otp-validator/OtpValidation";

export default function SetupOTP() {
  const user = useSelector((state) => state.user.user);
  const [qrScanned, setQrScanned] = useState(false);
  const navigate = useNavigate();

  // Si el usuario ya tiene OTP configurado, lo redirigimos
  if (user?.user_otp_configured) {
    navigate("/employee");
    return null;
  }

  return (<>
  <Navbar/>
     <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Configura tu autenticación OTP</h2>

      {!qrScanned ? (
        <div>
          <QrSetup />
          <button
            onClick={() => setQrScanned(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ya escaneé el QR
          </button>
        </div>
      ) : (
        <OtpValidation onSuccess={() => navigate("/check-in-out")} />
      )}
    </div>
  </>
 
  );
}
