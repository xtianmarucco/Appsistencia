import pool from "../database.js";
import { DateTime } from "luxon";

// GET /api/users/:id/stats
export const getUserStats = async (req, res) => {
  const { id } = req.params;

  // Mes actual
  const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
  const monthStart = now.startOf("month").toISODate(); // e.g. '2024-06-01'
  const monthEnd = now.endOf("month").toISODate();     // e.g. '2024-06-30'

  try {
    // 1. Buscar usuario
    const userResult = await pool.query(
      `SELECT id, name, lastname, email, role FROM users WHERE id = $1`,
      [id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const user = userResult.rows[0];

    // 2. Traer todas las asistencias del usuario en el mes actual
    const attResult = await pool.query(
      `SELECT work_session_id, action, timestamp
       FROM attendances
       WHERE user_id = $1
         AND timestamp >= $2
         AND timestamp <= $3
       ORDER BY timestamp ASC`,
      [id, monthStart, monthEnd]
    );

    // 3. Agrupar por work_session_id y parear check-in / check-out
    const sessions = {};
    attResult.rows.forEach(({ work_session_id, action, timestamp }) => {
      if (!sessions[work_session_id]) sessions[work_session_id] = {};
      sessions[work_session_id][action] = DateTime.fromJSDate(timestamp);
    });

    let totalHours = 0;
    let totalShifts = 0;

    Object.values(sessions).forEach((session) => {
      if (session["check-in"] && session["check-out"]) {
        const diff = session["check-out"].diff(session["check-in"], "hours").hours;
        if (diff > 0 && diff < 24) { // jornada válida
          totalHours += diff;
          totalShifts += 1;
        }
      }
    });

    return res.json({
      user,
      stats: {
        totalShifts,
        totalHours: totalHours.toFixed(2),
        month: now.month,
        year: now.year,
      }
    });
  } catch (error) {
    console.error("❌ Error al obtener stats de usuario:", error);
    return res.status(500).json({ error: "Error al obtener stats del usuario" });
  }
};
// GET /api/users/:id/attendances?start=YYYY-MM-DD&end=YYYY-MM-DD

export const getUserAttendances = async (req, res) => {
  const { id } = req.params;
  const { start, end } = req.query; // Fechas en formato ISO

  if (!id || !start || !end) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  try {
    const result = await pool.query(
      `SELECT id, work_session_id, action, timestamp
         FROM attendances
         WHERE user_id = $1
           AND timestamp >= $2
           AND timestamp <= $3
         ORDER BY timestamp ASC`,
      [id, start, end]
    );

    // Agrupar por work_session_id (para armar eventos de calendario)
    const sessions = {};
    result.rows.forEach((row) => {
      if (!sessions[row.work_session_id]) {
        sessions[row.work_session_id] = {};
      }
      sessions[row.work_session_id][row.action] = row.timestamp;
    });

    // Convertir a un array de eventos para el frontend
    const events = Object.values(sessions)
      .filter((s) => s["check-in"] && s["check-out"])
      .map((s) => ({
        start: DateTime.fromISO(s["check-in"]).toISO(),
        end: DateTime.fromISO(s["check-out"]).toISO(),
        title: "Turno trabajado",
      }));

    res.json(events);
  } catch (error) {
    console.error("❌ Error fetching attendances:", error);
    res.status(500).json({ error: "Error obteniendo turnos del usuario" });
  }
};