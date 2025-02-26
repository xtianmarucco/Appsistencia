import supabase from "../lib/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon"; // 📌 Importamos Luxon para manejo de fechas

export const getAttendances = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: "Falta user_id en la consulta." });
    }

    // 🔹 Obtener registros de asistencia
    const { data: attendances, error } = await supabase
      .from("attendances")
      .select("id, user_id, work_session_id, action, timestamp")
      .eq("user_id", user_id)
      .order("timestamp", { ascending: false });

    if (error) {
      throw error;
    }

    console.log("🧐 Datos crudos obtenidos desde Supabase:", attendances);

    // 🔹 Convertimos la fecha UTC a la zona horaria de Argentina antes de enviarla al frontend
    const attendancesWithLocalTime = attendances.map((record) => ({
      ...record,
      timestamp_local: DateTime.fromISO(record.timestamp, { zone: "utc" })
        .setZone("America/Argentina/Buenos_Aires")
        .toFormat("yyyy-MM-dd HH:mm:ss"), // ✅ Formato limpio
    }));

    res.json(attendancesWithLocalTime);
  } catch (error) {
    console.error("❌ Error al obtener registros de asistencia:", error);
    res.status(500).json({ error: "Error al obtener registros de asistencia" });
  }
};

export const checkInOut = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "Falta user_id en la solicitud." });
    }

    // 🔹 Obtener la hora actual en Argentina y convertir a UTC
    const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const nowUTC = now.toUTC().toISO(); // ✅ Convertimos a UTC antes de guardar

    console.log(`🕒 Hora actual en Argentina: ${now.toFormat("yyyy-MM-dd HH:mm:ss")}`);
    console.log(`🌍 Hora convertida a UTC para la DB: ${nowUTC}`);

    // 🔹 Buscar el check-in más reciente dentro de las últimas 24 horas
    const last24Hours = now.minus({ hours: 24 }).toUTC().toISO();

    const { data: recentCheckin, error: checkinError } = await supabase
      .from("attendances")
      .select("id, work_session_id, timestamp")
      .eq("user_id", user_id)
      .eq("action", "check-in")
      .gte("timestamp", last24Hours)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    if (checkinError && checkinError.code !== "PGRST116") {
      console.error("❌ Error al verificar el último check-in:", checkinError);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (recentCheckin) {
      // 🔥 Si hay check-in reciente, registrar check-out
      const { error: checkoutError } = await supabase
        .from("attendances")
        .insert([
          {
            id: uuidv4(),
            user_id,
            work_session_id: recentCheckin.work_session_id,
            action: "check-out",
            timestamp: nowUTC, // ✅ Guardamos en UTC
          },
        ]);

      if (checkoutError) {
        console.error("❌ Error al registrar check-out:", checkoutError);
        return res.status(500).json({ error: "Error al registrar check-out" });
      }

      console.log(`✅ Check-out registrado en UTC: ${nowUTC}`);
      return res.json({
        message: "Check-out registrado correctamente",
        timestamp: nowUTC,
      });
    } else {
      // 🔥 Si no hay check-in reciente, registrar un nuevo check-in
      const newWorkSessionId = uuidv4();

      const { error: checkinInsertError } = await supabase
        .from("attendances")
        .insert([
          {
            id: uuidv4(),
            user_id,
            work_session_id: newWorkSessionId,
            action: "check-in",
            timestamp: nowUTC, // ✅ Guardamos en UTC
          },
        ]);

      if (checkinInsertError) {
        console.error("❌ Error al registrar check-in:", checkinInsertError);
        return res.status(500).json({ error: "Error al registrar check-in" });
      }

      console.log(`✅ Check-in registrado en UTC: ${nowUTC}`);
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

export const getCheckInStatus = async (req, res) => {
  try {
    const { user_id } = req.params;
    const now = DateTime.now().setZone("America/Argentina/Buenos_Aires");
    const last24Hours = now.minus({ hours: 24 }).toUTC().toISO();

    const { data, error } = await supabase
      .from("attendances")
      .select("id")
      .eq("user_id", user_id)
      .eq("action", "check-in")
      .gte("timestamp", last24Hours)
      .order("timestamp", { ascending: false })
      .limit(1)
      .single();

    res.json({ hasCheckedIn: !!data });
  } catch (error) {
    res.status(500).json({ error: "Error verificando check-in" });
  }
};
