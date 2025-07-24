// controllers/loginController.js
import pool from "../database.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan email o password." });
  }

  try {
    const result = await pool.query(
      `SELECT id, email, role, user_otp_configured, password, name, lastname
        FROM users
        WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas." });
    }

    delete user.password;

    return res.json(user);
  } catch (error) {
    console.error("❌ Error durante el login:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
