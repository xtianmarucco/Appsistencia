

import { authenticator } from 'otplib';
import { supabase } from '../lib/supabaseClient';

// Genera una clave secreta para el usuario
export const generateOTPSecret = () => {
  return authenticator.generateSecret();
};

// Genera el URI para el código QR (formato estándar para autenticadores)
export const generateOTPAuthURI = (email, secret) => {
  return authenticator.keyuri(email, 'Appsistencia', secret); // "TuApp" es el nombre de tu aplicación
};

// Guarda la clave secreta en Supabase
export const saveOTPSecret = async (userId, secret) => {
  const { error } = await supabase
    .from('users')
    .update({ otp_secret: secret })
    .eq('id', userId);

  if (error) throw error;
};

// Valida un código OTP ingresado por el usuario
export function validateOtp(secret, otp) {
  return authenticator.check(otp, secret);
}
