import  supabase  from "../lib/supabaseClient.js";
import { authenticator } from "otplib"; // OTP library


// ✅ Generar y guardar el OTP en la DB
// export const setupOtp = async (req, res) => {
//   const { user_id } = req.body;

//   if (!user_id) {
//     return res.status(400).json({ error: "Se requiere user_id" });
//   }

//   // Generamos un secreto OTP único para el usuario
//   const otp_secret = authenticator.generateSecret();

//   // Guardamos el secreto en la base de datos
//   const { error } = await supabase
//     .from("users")
//     .update({ otp_secret, user_otp_configured: true })
//     .eq("id", user_id);

//   if (error) return res.status(500).json({ error: error.message });

//   // Generamos la URL del QR para Google Authenticator
//   const otp_auth_url = authenticator.keyuri(user_id, "Appsistencia", otp_secret);

//   res.json({ success: true, otp_auth_url });
// };
export const setupOtp = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Falta user_id" });
  }

  // 🔥 Generar un secreto OTP
  const secret = authenticator.generateSecret();
  console.log("🔑 Clave secreta generada:", secret);

  // 🔥 Guardar la clave en la base de datos
  const { error } = await supabase
    .from("users")
    .update({ otp_secret: secret })
    .eq("id", user_id);

  if (error) {
    console.error("❌ Error al guardar OTP en la base de datos:", error);
    return res.status(500).json({ error: "Error al guardar OTP en la base de datos" });
  }

  console.log("✅ Clave OTP guardada en la base de datos para el usuario:", user_id);

  res.json({ secret });
};

// ✅ Validar OTP ingresado por el usuario

export const validateOtp = async (req, res) => {
  console.log("📥 Datos recibidos en validateOtp:", req.body);

  // 🔥 Imprimir las claves del objeto req.body para depurar
  console.log("🔍 Claves recibidas:", Object.keys(req.body));

  const { user_id, otp_code } = req.body;

  console.log("🛠 user_id:", user_id);
  console.log("🛠 otp_code:", otp_code);

  if (!user_id || !otp_code) {
    console.log("❌ Falta user_id u otp_code");
    return res.status(400).json({ error: "Se requieren user_id y otp_code" });
  }

  // 🔥 Obtener el secreto OTP del usuario desde la base de datos
  const { data, error } = await supabase
    .from("users")
    .select("otp_secret")
    .eq("id", user_id)
    .single();

  console.log("🔍 Resultado de Supabase:", data, error);

  if (error || !data || !data.otp_secret) {
    console.log("❌ No se encontró el usuario o no tiene OTP configurado");
    return res.status(500).json({ error: "No se encontró el usuario o no tiene OTP configurado" });
  }

  const { otp_secret } = data;
  console.log("🔑 Secret OTP del usuario en la DB:", otp_secret);
  console.log("🔢 Código OTP recibido:", otp_code);

  // 🔥 Validamos el código OTP ingresado con el secreto almacenado
  const isValid = authenticator.verify({ token: otp_code, secret: otp_secret });

  console.log("✅ ¿Es el código válido?", isValid);

  if (!isValid) {
    console.log("❌ Código OTP inválido");
    return res.status(400).json({ error: "Código OTP inválido" });
  }
  if (isValid) {
    console.log("✅ Código OTP válido, actualizando user_otp_configured en la base de datos...");
  
    const { error: updateError } = await supabase
      .from("users")
      .update({ user_otp_configured: true })
      .eq("id", user_id);
  
    if (updateError) {
      console.log("❌ Error al actualizar user_otp_configured en la DB:", updateError);
      return res.status(500).json({ error: "Error al actualizar usuario" });
    }
  
    console.log("✅ user_otp_configured actualizado en la DB correctamente.");
  }
  console.log("✅ Código OTP válido, enviando respuesta al frontend...");
  return res.status(200).json({ success: true, message: "Código OTP válido" });
  
  
};
