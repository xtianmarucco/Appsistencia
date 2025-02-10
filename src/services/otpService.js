import { authenticator } from 'otplib';
import QRCode from 'qrcode'; // Importa la biblioteca correcta

// Genera una clave secreta para el usuario
export const generateSecret = () => {
  return authenticator.generateSecret();
};

// Genera el URI para el código QR
export const generateOTPAuthURI = (email, secret) => {
  return authenticator.keyuri(email, 'AppAsistencia', secret);
};

// Genera el código QR como una URL de imagen
export const generateQRCodeImage = async (otpAuthURI) => {
  try {
    const qrCodeImage = await QRCode.toDataURL(otpAuthURI);
    return qrCodeImage;
  } catch (error) {
    console.error('Error generando el código QR:', error);
    throw error;
  }
};