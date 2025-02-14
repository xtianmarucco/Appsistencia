import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";

import { generateOTPAuthURI } from "../../services/otpService";
import { supabase } from "../../lib/supabaseClient";

export default function QrSetup() {
  const user = useSelector((state) => state.user.user);
  const [otpUri, setOtpUri] = useState(null);

  useEffect(() => {
    const fetchOtpSecret = async () => {
      if (!user || user.otp_secret) {
        setOtpUri(generateOTPAuthURI(user.email, user.otp_secret));
        return;
      }

      // Si el usuario no tiene un otp_secret, lo generamos y guardamos en la BD
      const secret = authenticator.generateSecret();
      await supabase.from("users").update({ otp_secret: secret }).eq("id", user.id);
      
      setOtpUri(generateOTPAuthURI(user.email, secret));
    };

    fetchOtpSecret();
  }, [user]);

  if (!otpUri) return <p>Cargando QR...</p>;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-bold mb-2">Escanea este código QR con Google Authenticator</h3>
      <QRCodeCanvas value={otpUri} size={200} />
      </div>
  );
}
