// services/otpService.js

// Ya NO necesitas ni usar otplib ni generar secretos aquí
// ¡TODO lo maneja el backend!

// 🔗 Llama al backend para generar y guardar el secreto y obtener la URI del QR
export const setupOtp = async (userId) => {
  const response = await fetch(`http://localhost:3000/api/auth/setup-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al generar OTP");
  }

  // El backend devuelve { secret, otpAuthUrl }
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
