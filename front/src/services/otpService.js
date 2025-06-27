import { authenticator } from 'otplib';

// 🔒 (Opcional, pero recomendado): Mueve la generación del secreto y el QR al backend para mayor seguridad
// Si prefieres generarlo en el front, puedes dejar esto:
export const generateOTPSecret = () => {
  return authenticator.generateSecret();
};

export const generateOTPAuthURI = (email, secret) => {
  return authenticator.keyuri(email, 'Appsistencia', secret);
};

// 🔗 Guarda el secreto OTP llamando a tu endpoint del backend
export const saveOTPSecret = async (userId, secret) => {
  const response = await fetch(`http://localhost:3000/api/auth/setup-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, otp_secret: secret }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al guardar OTP");
  }
  // Puedes retornar el resultado si tu endpoint lo da (por ejemplo, el QR URI)
  return await response.json();
};

// 🔗 Validar OTP llamando al backend
export const validateOtp = async (userId, otp_code) => {
  const response = await fetch(`http://localhost:3000/api/auth/validate-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, otp_code }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "OTP inválido");
  }
  return await response.json();
};
