import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

// Inicializar Supabase con las credenciales del archivo .env
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

export default supabase;
