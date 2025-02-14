import { useState } from "react";
import { useSelector } from "react-redux";
import QrSetup from "../components/qr-generator/QrSetup";
import OtpValidation from "../components/otp-validator/OtpValidation";

export default function SetupOTP() {
  const user = useSelector((state) => state.user.user);
  const [qrScanned, setQrScanned] = useState(false);

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Verificación OTP</h2>

      {!qrScanned ? (
        <QrSetup onScanned={() => setQrScanned(true)} />
      ) : (
        <OtpValidation />
      )}
    </div>
  );
}
