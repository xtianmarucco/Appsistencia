import pool from "../database.js";
import { authenticator } from "otplib";

// POST /api/auth/setup-otp
export const setupOtp = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) return res.status(400).json({ error: "Falta user_id" });

  const secret = authenticator.generateSecret();

  try {
    await pool.query(
      "UPDATE users SET otp_secret = $1, user_otp_configured = false WHERE id = $2",
      [secret, user_id]
    );
    // Devuelve solo el URI para generar el QR en el front
    const otpAuthUrl = authenticator.keyuri(user_id, "Appsistencia", secret);
    return res.json({ otpAuthUrl });
  } catch (error) {
    return res.status(500).json({ error: "Error al guardar OTP en la base de datos" });
  }
};

// POST /api/auth/validate-otp
export const validateOtp = async (req, res) => {
  const { user_id, otp_code } = req.body;
  if (!user_id || !otp_code) {
    return res.status(400).json({ error: "Se requieren user_id y otp_code" });
  }

  try {
    const result = await pool.query(
      "SELECT otp_secret FROM users WHERE id = $1",
      [user_id]
    );
    if (result.rows.length === 0 || !result.rows[0].otp_secret) {
      return res.status(404).json({ error: "Usuario no encontrado o no tiene OTP configurado" });
    }
    const otp_secret = result.rows[0].otp_secret;

    const isValid = authenticator.verify({ token: otp_code, secret: otp_secret });

    if (!isValid) {
      return res.status(400).json({ error: "Código OTP inválido" });
    }
    // Si es válido, actualizar
    await pool.query(
      "UPDATE users SET user_otp_configured = true WHERE id = $1",
      [user_id]
    );
    return res.status(200).json({ success: true, message: "Código OTP válido" });
  } catch (error) {
    res.status(500).json({ error: "Error interno al validar OTP" });
  }
};
