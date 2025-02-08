import React from 'react';
import QRCode from 'qrcode.react';

const OTPQRCode = ({ otpAuthURI }) => {
  return (
    <div className="text-center">
      <QRCode
        value={otpAuthURI}
        size={200}
        level="H" // Nivel de corrección de errores (High)
        fgColor="#312f6a" // Color del código (azul oscuro de tu paleta)
        bgColor="#ffffff" // Fondo blanco
      />
      <p className="mt-4 text-sm text-gray-600">
        Escanea este código QR con Google Authenticator.
      </p>
    </div>
  );
};

export default OTPQRCode;