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
    console.log('[checkInOut] user_id recibido:', user_id);
    if (!user_id) {
      console.log('[checkInOut] FALTA user_id en la solicitud');
      return res.status(400).json({ error: "Falta user_id en la solicitud." });
    }

    // 1. 🔥 Tomamos la hora actual en Buenos Aires, y la convertimos a UTC (esto es lo que se guarda)
    const nowBuenosAires = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const nowUTC = nowBuenosAires.toUTC().toJSDate(); // ← Guardar como objeto Date

    // 2. Chequear si hay un check-in en las últimas 24h
    const last24Hours = nowBuenosAires.minus({ hours: 24 }).toUTC().toJSDate();

    // Buscar solo check-ins pendientes (sin check-out asociado)
    const checkinResult = await pool.query(
      `SELECT a.id, a.work_session_id, a.timestamp
       FROM attendances a
       WHERE a.user_id = $1
         AND a.action = 'check-in'
         AND a.timestamp >= $2
         AND NOT EXISTS (
           SELECT 1 FROM attendances b
           WHERE b.user_id = a.user_id
             AND b.work_session_id = a.work_session_id
             AND b.action = 'check-out'
         )
       ORDER BY a.timestamp DESC
       LIMIT 1`,
      [user_id, last24Hours]
    );
    console.log('[checkInOut] Resultado de búsqueda de check-in PENDIENTE en últimas 24h:', checkinResult.rows);
    const recentCheckin = checkinResult.rows[0];

    if (recentCheckin) {
      console.log('[checkInOut] Se encontró check-in reciente, se registrará check-out. work_session_id:', recentCheckin.work_session_id);
      await pool.query(
        `INSERT INTO attendances (id, user_id, work_session_id, action, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), user_id, recentCheckin.work_session_id, "check-out", nowUTC]
      );
      console.log('[checkInOut] Check-out registrado');
      return res.json({
        message: "Check-out registrado correctamente",
        timestamp: nowBuenosAires.toFormat("dd-MM-yyyy HH:mm:ss"), // ← Mostramos la hora local
      });
    } else {
      console.log('[checkInOut] No se encontró check-in reciente, se registrará check-in nuevo.');
      const newWorkSessionId = uuidv4();
      await pool.query(
        `INSERT INTO attendances (id, user_id, work_session_id, action, timestamp)
         VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), user_id, newWorkSessionId, "check-in", nowUTC]
      );
      console.log('[checkInOut] Check-in registrado');
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
    const todayStart = nowBuenosAires.startOf("day").toUTC().toJSDate();
    const todayEnd = nowBuenosAires.endOf("day").toUTC().toJSDate();

    // 1. Consulta: último check-in sin check-out (pendiente)
    const pendingResult = await pool.query(
      `SELECT a.work_session_id, a.timestamp
       FROM attendances a
       WHERE a.user_id = $1
         AND a.action = 'check-in'
         AND NOT EXISTS (
           SELECT 1 FROM attendances b
           WHERE b.user_id = a.user_id
             AND b.work_session_id = a.work_session_id
             AND b.action = 'check-out'
         )
       ORDER BY a.timestamp DESC
       LIMIT 1`,
      [user_id]
    );
    const pendingSession = pendingResult.rows[0] || null;

    // 2. Consulta: todas las sesiones del día (pares check-in/check-out)
    const sessionsResult = await pool.query(
      `SELECT
         ws.work_session_id,
         MIN(CASE WHEN ws.action = 'check-in' THEN ws.timestamp END) AS check_in,
         MAX(CASE WHEN ws.action = 'check-out' THEN ws.timestamp END) AS check_out
       FROM attendances ws
       WHERE ws.user_id = $1
         AND ws.timestamp >= $2
         AND ws.timestamp <= $3
       GROUP BY ws.work_session_id
       ORDER BY check_in ASC;`,
      [user_id, todayStart, todayEnd]
    );
    const todaySessions = sessionsResult.rows.map(row => ({
      sessionId: row.work_session_id,
      checkIn: row.check_in,
      checkOut: row.check_out
    }));

    // 3. Construir el objeto de respuesta
    const hasPendingCheckIn = !!pendingSession;
    const canCheckIn = !hasPendingCheckIn;
    const canCheckOut = hasPendingCheckIn;
    const lastCheckIn = pendingSession
      ? { timestamp: pendingSession.timestamp, sessionId: pendingSession.work_session_id }
      : null;

    let message = "";
    if (hasPendingCheckIn) {
      message = "You have a pending check-in. Please check out before starting a new session.";
    } else {
      message = "You can check in to start a new session.";
    }

    res.json({
      hasPendingCheckIn,
      canCheckIn,
      canCheckOut,
      lastCheckIn,
      todaySessions,
      message
    });
  } catch (error) {
    console.error("❌ Error verificando check-in-status:", error);
    res.status(500).json({ error: "Error verificando check-in-status" });
  }
};
