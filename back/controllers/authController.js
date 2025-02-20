import { supabase } from "../lib/supabaseClient.js";
import { authenticator } from "otplib"; // OTP library


// ✅ Generar y guardar el OTP en la DB
export const setupOtp = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Se requiere user_id" });
  }

  // Generamos un secreto OTP único para el usuario
  const otp_secret = authenticator.generateSecret();

  // Guardamos el secreto en la base de datos
  const { error } = await supabase
    .from("users")
    .update({ otp_secret, user_otp_configured: true })
    .eq("id", user_id);

  if (error) return res.status(500).json({ error: error.message });

  // Generamos la URL del QR para Google Authenticator
  const otp_auth_url = authenticator.keyuri(user_id, "Appsistencia", otp_secret);

  res.json({ success: true, otp_auth_url });
};

// ✅ Validar OTP ingresado por el usuario
export const validateOtp = async (req, res) => {
  const { user_id, otp_code } = req.body;

  if (!user_id || !otp_code) {
    return res.status(400).json({ error: "Se requieren user_id y otp_code" });
  }

  // Obtenemos el secreto OTP del usuario desde la base de datos
  const { data, error } = await supabase
    .from("users")
    .select("otp_secret")
    .eq("id", user_id)
    .single();

  if (error || !data) {
    return res.status(500).json({ error: "No se encontró el usuario o no tiene OTP configurado" });
  }

  const { otp_secret } = data;

  // Validamos el código OTP ingresado con el secreto almacenado
  const isValid = authenticator.verify({ token: otp_code, secret: otp_secret });

  if (!isValid) {
    return res.status(400).json({ error: "Código OTP inválido" });
  }

  res.json({ success: true, message: "Código OTP válido" });
};
