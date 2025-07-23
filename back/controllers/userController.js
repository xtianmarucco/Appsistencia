import pool from "../database.js";
import { v4 as uuidv4 } from "uuid";
import { authenticator } from "otplib";

// ✅ Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, lastname, email, role, hourly_wage, active FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// ✅ Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id, name, lastname, email, role, hourly_wage, active FROM users WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

// ✅ Crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, lastname, email, id_number, role, hourly_wage, password, active = true } = req.body;
    if (!name || !lastname || !email || !role || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const otpSecret = authenticator.generateSecret();
    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO users (
        id, name, lastname, email, id_number, role, hourly_wage, created_at, active, password, otp_secret, user_otp_configured
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW(), $8, $9, $10, $11
      ) RETURNING *`,
      [
        id,
        name,
        lastname,
        email,
        id_number || null,
        role,
        hourly_wage || 0,
        active,
        password,
        otpSecret,
        false
      ]
    );

    res.status(201).json({ message: "Usuario creado con éxito.", user: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);
    res.status(500).json({ error: "Error al crear usuario." });
  }
};

// ✅ Editar usuario
export const updateUser = async (req, res) => {
  try {

    const { id } = req.params;
    const { name, lastname, email, password, hourly_wage, active } = req.body;

    if (!name || !lastname || !email) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Construir la consulta dinámica para actualizar solo los campos permitidos
    let query = `UPDATE users SET name=$1, lastname=$2, email=$3, hourly_wage=$4, active=$5`;
    let params = [name, lastname, email, hourly_wage, active];
    let paramIndex = 6;

    if (password) {
      query += `, password=$${paramIndex}`;
      params.push(password);
      paramIndex++;
    }

    query += ` WHERE id=$${paramIndex} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// ✅ Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    );

    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};

// ✅ Usuarios con horas trabajadas en un período (versión simple, ajustable según tus necesidades)
export const getUsersWithHours = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Debe proporcionar un rango de fechas." });
    }

    // 1. Traer usuarios
    const usersResult = await pool.query(
      "SELECT id, name, lastname, role, email FROM users"
    );
    const users = usersResult.rows;

    // 2. Traer attendances en rango
    const attendancesResult = await pool.query(
      `SELECT user_id, work_session_id, action, timestamp
       FROM attendances
       WHERE timestamp BETWEEN $1 AND $2
       ORDER BY timestamp ASC`,
      [startDate, endDate]
    );
    const attendances = attendancesResult.rows;

    // 3. Agrupar y calcular horas
    const grouped = {};
    attendances.forEach(record => {
      if (!grouped[record.user_id]) grouped[record.user_id] = {};
      if (!grouped[record.user_id][record.work_session_id])
        grouped[record.user_id][record.work_session_id] = { checkin: null, checkout: null };
      if (record.action === "check-in") {
        grouped[record.user_id][record.work_session_id].checkin = new Date(record.timestamp);
      } else if (record.action === "check-out") {
        grouped[record.user_id][record.work_session_id].checkout = new Date(record.timestamp);
      }
    });

    // 4. Mapear usuarios con sus horas trabajadas
    const usersWithHours = users.map(user => {
      const userSessions = grouped[user.id] || {};
      const totalHours = Object.values(userSessions)
        .filter(session => session.checkin && session.checkout)
        .map(session => (session.checkout - session.checkin) / (1000 * 60 * 60))
        .reduce((total, hoursWorked) => total + hoursWorked, 0)
        .toFixed(2);

      return { ...user, totalHours };
    });

    res.json(usersWithHours);
  } catch (error) {
    console.error("❌ Error al obtener usuarios con horas trabajadas:", error);
    res.status(500).json({ error: "Error al obtener usuarios con horas trabajadas" });
  }
};
