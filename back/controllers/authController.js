import pool from "../database.js";
import { authenticator } from "otplib";

// ✅ Generar y guardar el OTP en la DB
export const setupOtp = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Falta user_id" });
  }

  // 🔥 Generar un secreto OTP
  const secret = authenticator.generateSecret();
  console.log("🔑 Clave secreta generada:", secret);

  // 🔥 Guardar la clave en la base de datos
  try {
    await pool.query(
      "UPDATE users SET otp_secret = $1 WHERE id = $2",
      [secret, user_id]
    );
    console.log("✅ Clave OTP guardada en la base de datos para el usuario:", user_id);
    res.json({ secret });
  } catch (error) {
    console.error("❌ Error al guardar OTP en la base de datos:", error);
    res.status(500).json({ error: "Error al guardar OTP en la base de datos" });
  }
};


// ✅ Validar OTP ingresado por el usuario
export const validateOtp = async (req, res) => {
  console.log("📥 Datos recibidos en validateOtp:", req.body);

  const { user_id, otp_code } = req.body;

  if (!user_id || !otp_code) {
    return res.status(400).json({ error: "Se requieren user_id y otp_code" });
  }

  try {
    // 🔥 Obtener el secreto OTP del usuario desde la base de datos
    const result = await pool.query(
      "SELECT otp_secret FROM users WHERE id = $1",
      [user_id]
    );

    if (result.rows.length === 0 || !result.rows[0].otp_secret) {
      return res.status(500).json({ error: "No se encontró el usuario o no tiene OTP configurado" });
    }

    const otp_secret = result.rows[0].otp_secret;
    console.log("🔑 Secret OTP del usuario en la DB:", otp_secret);
    console.log("🔢 Código OTP recibido:", otp_code);

    // 🔥 Validamos el código OTP ingresado con el secreto almacenado
    const isValid = authenticator.verify({ token: otp_code, secret: otp_secret });

    console.log("✅ ¿Es el código válido?", isValid);

    if (!isValid) {
      return res.status(400).json({ error: "Código OTP inválido" });
    }

    // Si el código es válido, actualizar el campo user_otp_configured a true
    await pool.query(
      "UPDATE users SET user_otp_configured = true WHERE id = $1",
      [user_id]
    );
    console.log("✅ user_otp_configured actualizado en la DB correctamente.");

    return res.status(200).json({ success: true, message: "Código OTP válido" });

  } catch (error) {
    console.error("❌ Error al validar OTP:", error);
    res.status(500).json({ error: "Error interno al validar OTP" });
  }
};
