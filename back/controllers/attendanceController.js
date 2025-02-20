import { supabase } from "../lib/supabaseClient.js";
import { v4 as uuidv4 } from "uuid";

export const getAttendances = async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from("attendances")
    .select("*")
    .eq("user_id", userId)
    .order("timestamp", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

export const registerAttendance = async (req, res) => {
  const { user_id, action } = req.body;

  if (!["check-in", "check-out"].includes(action)) {
    return res.status(400).json({ error: "Acción no válida" });
  }

  const { data: lastRecord, error: fetchError } = await supabase
    .from("attendances")
    .select("*")
    .eq("user_id", user_id)
    .order("timestamp", { ascending: false })
    .limit(1);

  if (fetchError) return res.status(500).json({ error: fetchError.message });

  if (lastRecord.length > 0) {
    const lastAction = lastRecord[0].action;

    if (lastAction === "check-in" && action === "check-in") {
      return res.status(400).json({ error: "Debes hacer check-out antes de otro check-in." });
    }
  }

  const work_session_id = action === "check-in" ? uuidv4() : lastRecord[0].work_session_id;

  const { error: insertError } = await supabase.from("attendances").insert([
    {
      id: uuidv4(),
      user_id,
      work_session_id,
      action,
      timestamp: new Date().toISOString(),
    },
  ]);

  if (insertError) return res.status(500).json({ error: insertError.message });

  res.json({ success: true, message: `Registro de ${action} exitoso.` });
};
