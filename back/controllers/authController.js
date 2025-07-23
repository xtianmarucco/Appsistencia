// controllers/authController.js
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
    const otpAuthUrl = authenticator.keyuri(user_id, "Appsistencia", secret);
    return res.json({ secret, otpAuthUrl });
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
    // Buscar usuario y secreto OTP
    const result = await pool.query(
      "SELECT id, name, lastname, otp_secret, user_otp_configured FROM users WHERE id = $1",
      [user_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const { otp_secret, name, lastname, user_otp_configured } = result.rows[0];
    if (!otp_secret) {
      return res.status(400).json({ error: "El usuario no tiene OTP configurado" });
    }

    // Validar OTP
    const isValid = authenticator.verify({ token: otp_code, secret: otp_secret });
    if (!isValid) {
      return res.status(401).json({ error: "Código OTP inválido" });
    }

    // Actualizar estado OTP solo si no estaba configurado
    if (!user_otp_configured) {
      await pool.query(
        "UPDATE users SET user_otp_configured = true WHERE id = $1",
        [user_id]
      );
    }

    // Respuesta clara y útil para frontend
    return res.status(200).json({
      success: true,
      message: "Código OTP válido",
      user: {
        id: user_id,
        name,
        lastname,
        otp_configured: true
      }
    });
  } catch (error) {
    console.error("Error en validateOtp:", error);
    res.status(500).json({ error: "Error interno al validar OTP" });
  }
};
