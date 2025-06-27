import pool from "../database.js";

// GET /api/users/:id/shifts
export const getUserShifts = async (req, res) => {
  try {
    const { id } = req.params;
    // Opcional: puedes filtrar por fechas si quieres
    // const { from, to } = req.query;

    // 1. Trae todos los check-in y check-out del usuario
    const result = await pool.query(
      `SELECT work_session_id, action, timestamp
       FROM attendances
       WHERE user_id = $1
       ORDER BY timestamp ASC`,
      [id]
    );

    // 2. Agrupa por sesión de trabajo
    const sessions = {};
    result.rows.forEach((row) => {
      if (!sessions[row.work_session_id]) {
        sessions[row.work_session_id] = {};
      }
      sessions[row.work_session_id][row.action] = row.timestamp;
    });

    // 3. Convierte a eventos FullCalendar
    const shifts = Object.values(sessions)
      .filter(s => s["check-in"] && s["check-out"]) // Solo sesiones completas
      .map(s => ({
        title: "Turno",
        start: s["check-in"],
        end: s["check-out"],
      }));

    res.json(shifts);
  } catch (error) {
    console.error("❌ Error obteniendo turnos:", error);
    res.status(500).json({ error: "Error obteniendo turnos del usuario." });
  }
};
