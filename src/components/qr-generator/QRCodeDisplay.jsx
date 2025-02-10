
import QRCode from 'qrcode'; // Importa qrcode.react
import { generateOTPAuthURI } from '../../services/otpService';

const QRCodeDisplay = ({ email, secret }) => {
  const otpAuthURI = generateOTPAuthURI(email, secret);

  return (
    <div className="flex flex-col items-center">
      <QRCode value={otpAuthURI} size={128} /> {/* Renderiza el código QR directamente */}
      <p className="mt-2 text-sm text-primary-text">Escanea este código QR con tu autenticador</p>
    </div>
  );
};

export default QRCodeDisplay;