import pool from "../database.js";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

// Obtener registros de asistencia de un usuario
export const getAttendances = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: "Falta user_id en la consulta." });
    }

    // PostgreSQL query
    const result = await pool.query(
      `SELECT id, user_id, work_session_id, action, timestamp
       FROM attendances
       WHERE user_id = $1
       ORDER BY timestamp DESC`,
      [user_id]
    );

    // Convertir la fecha a horario local de Argentina
    const attendancesWithLocalTime = result.rows.map((record) => ({
      ...record,
      timestamp_local: DateTime.fromISO(record.timestamp, { zone: "utc" })
        .setZone("America/Argentina/Buenos_Aires")
        .toFormat("yyyy-MM-dd HH:mm:ss"),
    }));

    res.json(attendancesWithLocalTime);
  } catch (error) {
    console.error("❌ Error al obtener registros de asistencia:", error);
    res.status(500).json({ error: "Error al obtener registros de asistencia" });
  }
};


// Check-in y check-out automático
export const checkInOut = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Falta user_id en la solicitud." });
    }

    // Hora actual en Argentina → UTC
    const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const nowUTC = now.toUTC().toISO();

    // Buscar el check-in más reciente dentro de las últimas 24 horas
    const last24Hours = now.minus({ hours: 24 }).toUTC().toISO();

    const checkinResult = await pool.query(
      `SELECT id, work_session_id, timestamp
       FROM attendances
       WHERE user_id = $1
         AND action = 'check-in'
         AND timestamp >= $2
       ORDER BY timestamp DESC
       LIMIT 1`,
      [user_id, last24Hours]
    );
    const recentCheckin = checkinResult.rows[0];

    if (recentCheckin) {
      // Si hay check-in reciente, registrar check-out
      await pool.query(
        `INSERT INTO attendances (id, user_id, work_session_id, action, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), user_id, recentCheckin.work_session_id, "check-out", nowUTC]
      );

      return res.json({
        message: "Check-out registrado correctamente",
        timestamp: nowUTC,
      });
    } else {
      // Si no hay check-in reciente, registrar un nuevo check-in
      const newWorkSessionId = uuidv4();
      await pool.query(
        `INSERT INTO attendances (id, user_id, work_session_id, action, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), user_id, newWorkSessionId, "check-in", nowUTC]
      );

      return res.json({
        message: "Check-in registrado correctamente",
        timestamp: nowUTC,
      });
    }
  } catch (error) {
    console.error("❌ Error en check-in/check-out:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// Saber si ya hizo check-in (últimas 24h)
export const getCheckInStatus = async (req, res) => {
  try {
    const { user_id } = req.params;
    const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const last24Hours = now.minus({ hours: 24 }).toUTC().toISO();

    const result = await pool.query(
      `SELECT id
       FROM attendances
       WHERE user_id = $1
         AND action = 'check-in'
         AND timestamp >= $2
       ORDER BY timestamp DESC
       LIMIT 1`,
      [user_id, last24Hours]
    );

    res.json({ hasCheckedIn: result.rows.length > 0 });
  } catch (error) {
    res.status(500).json({ error: "Error verificando check-in" });
  }
};
