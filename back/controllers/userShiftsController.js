import pool from "../database.js";

// GET /api/users/:id/shifts
export const getUserShifts = async (req, res) => {
  try {
    const { id } = req.params;

    // 🗓️ Fecha actual y primer día del mes
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 🔥 Filtrar los registros solo del mes actual
    const result = await pool.query(
      `SELECT work_session_id, action, timestamp, date_trunc('day', timestamp) as day
       FROM attendances
       WHERE user_id = $1
       AND timestamp >= $2
       AND timestamp <= $3
       ORDER BY timestamp ASC`,
      [id, startOfMonth.toISOString(), today.toISOString()]
    );

    // Agrupar por sesión de trabajo
    const sessions = {};
    result.rows.forEach((row) => {
      if (!sessions[row.work_session_id]) {
        sessions[row.work_session_id] = {};
      }
      sessions[row.work_session_id][row.action] = row.timestamp;
    });

    // Convertir a eventos FullCalendar
    const shifts = Object.values(sessions)
      .filter(s => s["check-in"] && s["check-out"])
      .map(s => ({
        title: "Turno",
        start: s["check-in"],
        end: s["check-out"],
      }));

    const totalShifts = shifts.length;
    const totalHours = shifts.reduce((acc, shift) => {
      const start = new Date(shift.start);
      const end = new Date(shift.end);
      const hours = (end - start) / (1000 * 60 * 60);
      return acc + hours;
    }, 0);

    res.json({ shifts, totalShifts, totalHours });
  } catch (error) {
    console.error("❌ Error obteniendo turnos:", error);
    res.status(500).json({ error: "Error obteniendo turnos del usuario." });
  }
};