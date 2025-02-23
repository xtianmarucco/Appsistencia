import supabase from "../lib/supabaseClient.js";

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, role, email");

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Obtener usuarios con horas trabajadas
export const getUsersWithHours = async (req, res) => {
  try {
    // 🔹 Obtener todos los usuarios
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id, name, lastname, role, email");

    if (userError) {
      throw userError;
    }

    // 🔥 Obtener registros de asistencia
    const { data: attendances, error: attendanceError } = await supabase
      .from("attendances")
      .select("user_id, work_session_id, action, timestamp")
      .order("timestamp", { ascending: true });

    if (attendanceError) {
      console.error("❌ Error obteniendo asistencias:", attendanceError);
      throw attendanceError;
    }

    console.log("🧐 Datos obtenidos de attendances desde Supabase:", attendances);

    if (!attendances || attendances.length === 0) {
      console.log("❌ No hay datos de asistencia.");
      return res.json({ message: "No data found", hoursLast7Days: "0.00", hoursLast15Days: "0.00", hoursLast30Days: "0.00" });
    }

    // 🔹 Obtener la última fecha registrada en la DB como referencia
    const latestRecord = new Date(attendances[attendances.length - 1].timestamp);
    console.log("📆 Última fecha registrada en la DB:", latestRecord);

    // 🔹 Definir rangos de fechas en función de la última fecha registrada
    const last7Days = new Date(latestRecord);
    last7Days.setDate(latestRecord.getDate() - 7);

    const last15Days = new Date(latestRecord);
    last15Days.setDate(latestRecord.getDate() - 15);

    const last30Days = new Date(latestRecord);
    last30Days.setDate(latestRecord.getDate() - 30);

    console.log("📆 Fechas corregidas basadas en la última fecha en la DB:");
    console.log("🔹 Últimos 7 días desde:", last7Days);
    console.log("🔹 Últimos 15 días desde:", last15Days);
    console.log("🔹 Últimos 30 días desde:", last30Days);

    // 🔹 Agrupar registros por usuario y sesión de trabajo
    const groupedAttendances = {};
    attendances.forEach((record) => {
      if (!groupedAttendances[record.user_id]) {
        groupedAttendances[record.user_id] = {};
      }

      if (!groupedAttendances[record.user_id][record.work_session_id]) {
        groupedAttendances[record.user_id][record.work_session_id] = {
          checkin: null,
          checkout: null
        };
      }

      if (record.action === "check-in") {
        groupedAttendances[record.user_id][record.work_session_id].checkin = new Date(record.timestamp);
      } else if (record.action === "check-out") {
        groupedAttendances[record.user_id][record.work_session_id].checkout = new Date(record.timestamp);
      }
    });

    console.log("📊 Registros agrupados por usuario y sesión:", groupedAttendances);

    // 🔥 Función para calcular horas trabajadas en un período
    const getTotalHours = (userId, dateLimit) => {
      const userSessions = groupedAttendances[userId] || {};

      console.log(`🧐 Revisando sesiones de trabajo del usuario ${userId} desde ${dateLimit}`);

      return Object.values(userSessions)
        .filter(session => session.checkin && session.checkout) // 🔥 Asegurar que haya ambos registros
        .filter(session => {
          const checkinTime = new Date(session.checkin);
          return checkinTime >= dateLimit;
        }) // 🔥 Solo contar sesiones dentro del rango
        .map(session => {
          const checkinTime = new Date(session.checkin);
          const checkoutTime = new Date(session.checkout);

          if (checkoutTime > checkinTime) {
            const workedHours = (checkoutTime - checkinTime) / (1000 * 60 * 60);
            console.log(`✅ Sesión válida - Check-in: ${checkinTime}, Check-out: ${checkoutTime}, Horas trabajadas: ${workedHours}`);
            return workedHours;
          } else {
            console.warn(`⚠️ Error en sesión: Check-in (${checkinTime}) ocurre después de Check-out (${checkoutTime})`);
            return 0;
          }
        })
        .reduce((total, sessionHours) => total + sessionHours, 0)
        .toFixed(2);
    };

    // 🔹 Calcular horas trabajadas por usuario en cada período
    const usersWithHours = users.map(user => ({
      ...user,
      hoursLast7Days: getTotalHours(user.id, last7Days),
      hoursLast15Days: getTotalHours(user.id, last15Days),
      hoursLast30Days: getTotalHours(user.id, last30Days),
    }));

    console.log("✅ Horas trabajadas calculadas:", usersWithHours);

    res.json(usersWithHours);
  } catch (error) {
    console.error("❌ Error al obtener usuarios con horas trabajadas:", error);
    res.status(500).json({ error: "Error al obtener usuarios con horas trabajadas" });
  }
};
