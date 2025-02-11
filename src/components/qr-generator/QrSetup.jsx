import { useEffect, useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import { useSelector } from "react-redux";
import { generateOTPAuthURI } from "../../services/otpService";

export default function QrSetup() {
  const user = useSelector((state) => state.user);
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (user?.otp_secret) {
      const otpAuthUrl = generateOTPAuthURI(user.email, "Appsistencia", user.otp_secret);
      setQrCode(otpAuthUrl);
    }
  }, [user]);

  if (!qrCode) return null; // No renderiza nada si no hay un QR para mostrar

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold">Escanea este código QR con Google Authenticator</h2>
      {/* <QRCodeSVG value="www.google.com" size={200} /> */}
      <QRCodeSVG value={qrCode} size={200} />
      <p className="text-sm text-gray-600 mt-2">Luego ingresa el código OTP generado.</p>
    </div>
  );
}
