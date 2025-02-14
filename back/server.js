import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authenticator } from "otplib";
import { createClient } from "@supabase/supabase-js";

// Cargar variables de entorno
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("¡El servidor está funcionando correctamente! 🚀");
  });

// Conectar con Supabase
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

// 📌 Ruta para validar el OTP ingresado por el usuario
app.post("/validate-otp", async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({ valid: false, message: "Faltan datos" });
  }

  try {
    // Obtener la clave secreta OTP del usuario desde Supabase
    const { data, error } = await supabase
      .from("users")
      .select("otp_secret")
      .eq("id", userId)
      .single();

    if (error || !data?.otp_secret) {
      return res.status(404).json({ valid: false, message: "Usuario no encontrado" });
    }

    // Validar el OTP usando otplib
    const isValid = authenticator.check(otp, data.otp_secret);

    if (isValid) {
      // Marcar que el usuario configuró el OTP en la BD
      await supabase.from("users").update({ user_otp_configured: true }).eq("id", userId);
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false, message: "Código OTP inválido" });
    }
  } catch (err) {
    console.error("Error al validar OTP:", err);
    return res.status(500).json({ valid: false, message: "Error interno del servidor" });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
