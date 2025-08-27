import pool from "../database.js";
import { DateTime } from "luxon";

// GET /api/users/:id/shifts?start=YYYY-MM-DD&end=YYYY-MM-DD
export const getUserShifts = async (req, res) => {
  const { id } = req.params;
  const { start, end } = req.query;

  try {
    let startDate, endDate;

    if (start && end) {
      startDate = DateTime.fromISO(start).startOf("day").toJSDate();
      endDate = DateTime.fromISO(end).endOf("day").toJSDate();
    } else {
      const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
      startDate = now.startOf("month").toJSDate();
      endDate = now.endOf("month").toJSDate();
    }

    const result = await pool.query(
      `SELECT work_session_id, action, timestamp
       FROM attendances
       WHERE user_id = $1
         AND timestamp >= $2
         AND timestamp <= $3
       ORDER BY timestamp ASC`,
      [id, startDate, endDate]
    );

    const sessions = {};
    result.rows.forEach(({ work_session_id, action, timestamp }) => {
      if (!sessions[work_session_id]) {
        sessions[work_session_id] = {};
      }
      sessions[work_session_id][action] = timestamp;
    });

    const shifts = Object.values(sessions)
      .filter(s => s["check-in"] && s["check-out"])
      .map(s => {
        const start = DateTime.fromJSDate(s["check-in"]);
        const end = DateTime.fromJSDate(s["check-out"]);
        const hours = end.diff(start, "hours").hours;
        return {
          title: `${hours.toFixed(2)} h`,
          start: start.toISO(),
          end: end.toISO(),
          hours: parseFloat(hours.toFixed(2))
        };
      });

    const totalShifts = shifts.length;
    const totalHours = shifts.reduce((sum, s) => sum + s.hours, 0);

    res.json({ shifts, totalShifts, totalHours: totalHours.toFixed(2) });
  } catch (error) {
    console.error("❌ Error obteniendo turnos:", error);
    res.status(500).json({ error: "Error obteniendo turnos del usuario." });
  }
};