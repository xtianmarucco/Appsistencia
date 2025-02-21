import { supabase } from '../lib/supabaseClient';

export const login = async (email, password) => {
  try {
    // Consulta la tabla "users" para encontrar un usuario con el email proporcionado
    const { data, error } = await supabase
      .from('users')
      .select('id, email, role, user_otp_configured, password')       .eq('email', email)
      .single(); // Espera un solo resultado

    if (error) {
      throw error;
    }

    // Verifica si el usuario existe y si la contraseña coincide
    if (!data || data.password !== password) {
      throw new Error('Credenciales inválidas');
    }

    // Devuelve los datos del usuario si la autenticación es exitosa
    return data;
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error.message);
    throw error;
  }
};

export const logout = () => {
  // Simplemente limpiamos el estado del usuario (lo manejaremos en Redux)
  return Promise.resolve();
};