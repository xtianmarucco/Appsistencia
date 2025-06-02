import pool from "../database.js"; // Usar tu pool de conexión

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Consulta el usuario por email
    const result = await pool.query(
      `SELECT id, email, role, user_otp_configured, password
       FROM users
       WHERE email = $1`,
      [email]
    );

    // Si no se encuentra el usuario
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = result.rows[0];

    // Si la contraseña no coincide (en producción debes usar hash, aquí queda igual a tu ejemplo)
    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // No retornamos la contraseña al frontend
    delete user.password;

    // Devuelve los datos del usuario
    return res.json(user);
  } catch (error) {
    console.error("❌ Error durante el login:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
