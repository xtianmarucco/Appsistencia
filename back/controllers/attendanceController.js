import pool from "../database.js";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";

// ✅ Obtener registros de asistencia de un usuario
export const getAttendances = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: "Falta user_id en la consulta." });
    }

    // 🚩 Traer registros ordenados por fecha
    const result = await pool.query(
      `SELECT id, user_id, work_session_id, action, timestamp
       FROM attendances
       WHERE user_id = $1
       ORDER BY timestamp DESC`,
      [user_id]
    );

    // 🚩 Convertir la fecha UTC de la DB a hora local de Argentina SOLO PARA MOSTRAR
    const attendancesWithLocalTime = result.rows.map((record) => ({
      ...record,
      timestamp_local: DateTime.fromJSDate(record.timestamp, { zone: "utc" })
        .setZone("America/Argentina/Buenos_Aires")
        .toFormat("yyyy-MM-dd HH:mm:ss"),
    }));

    res.json(attendancesWithLocalTime);
  } catch (error) {
    console.error("❌ Error al obtener registros de asistencia:", error);
    res.status(500).json({ error: "Error al obtener registros de asistencia" });
  }
};


// ✅ Registrar check-in/check-out usando la hora de Argentina → guardada como UTC
export const checkInOut = async (req, res) => {
  try {
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(400).json({ error: "Falta user_id en la solicitud." });
    }

    // 1. 🔥 Tomamos la hora actual en Buenos Aires, y la convertimos a UTC (esto es lo que se guarda)
    const nowBuenosAires = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const nowUTC = nowBuenosAires.toUTC().toJSDate(); // ← Guardar como objeto Date

    // 2. Chequear si hay un check-in en las últimas 24h
    const last24Hours = nowBuenosAires.minus({ hours: 24 }).toUTC().toJSDate();

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
      // Registrar check-out con la MISMA sesión
      await pool.query(
        `INSERT INTO attendances (id, user_id, work_session_id, action, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), user_id, recentCheckin.work_session_id, "check-out", nowUTC]
      );
      return res.json({
        message: "Check-out registrado correctamente",
        timestamp: nowBuenosAires.toFormat("dd-MM-yyyy HH:mm:ss"), // ← Mostramos la hora local
      });
    } else {
      // Registrar check-in NUEVO
      const newWorkSessionId = uuidv4();
      await pool.query(
        `INSERT INTO attendances (id, user_id, work_session_id, action, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), user_id, newWorkSessionId, "check-in", nowUTC]
      );
      return res.json({
        message: "Check-in registrado correctamente",
        timestamp: nowBuenosAires.toFormat("yyyy-MM-dd HH:mm:ss"),
      });
    }
  } catch (error) {
    console.error("❌ Error en check-in/check-out:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


// ✅ Saber si ya hizo check-in (últimas 24h)
export const getCheckInStatus = async (req, res) => {
  try {
    const { user_id } = req.params;
    const nowBuenosAires = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const last24Hours = nowBuenosAires.minus({ hours: 24 }).toUTC().toJSDate();

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
