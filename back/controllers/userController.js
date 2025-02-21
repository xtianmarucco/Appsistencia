import supabase from "../lib/supabaseClient.js";

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

export const getUsersWithHours = async (req, res) => {
  try {
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id, name, lastname, role, email");

    if (userError) {
      throw userError;
    }

    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    
    const last15Days = new Date(today);
    last15Days.setDate(today.getDate() - 15);
    
    const last30Days = new Date(today);
    last30Days.setDate(today.getDate() - 30);

    // 🔥 Obtener horas trabajadas por usuario en diferentes períodos
    const { data: attendances, error: attendanceError } = await supabase
      .from("attendances")
      .select("user_id, worked_hours, date");

    if (attendanceError) {
      throw attendanceError;
    }

    // 🔥 Mapear usuarios con sus horas trabajadas en los últimos 7, 15 y 30 días
    const usersWithHours = users.map(user => {
      const userAttendances = attendances.filter(a => a.user_id === user.id);

      const getTotalHours = (dateLimit) => {
        return userAttendances
          .filter(a => new Date(a.date) >= dateLimit)
          .reduce((total, a) => total + a.worked_hours, 0);
      };

      return {
        ...user,
        hoursLast7Days: getTotalHours(last7Days),
        hoursLast15Days: getTotalHours(last15Days),
        hoursLast30Days: getTotalHours(last30Days),
      };
    });

    res.json(usersWithHours);
  } catch (error) {
    console.error("❌ Error al obtener usuarios con horas trabajadas:", error);
    res.status(500).json({ error: "Error al obtener usuarios con horas trabajadas" });
  }
};