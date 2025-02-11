import { useSelector } from "react-redux";
import QrSetup from "../components/qr-generator/QrSetup";
import OtpValidation from "../components/otp-validator/OtpValidation";
import { useState } from "react";
import Navbar from "../components/navbar/navbar";

export default function SetupOtp() {
  const user = useSelector((state) => state.user);
  const [isOtpValidated, setIsOtpValidated] = useState(false);

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar />

        <QrSetup />
        <OtpValidation onSuccess={() => setIsOtpValidated(true)} />
        <div />
      </div>
    </>
  );
}
