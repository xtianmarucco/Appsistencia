import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from '../services/authServices'; // Importa login y logout
import { setUser } from '../store/slices/userSlice'; // Importa setUser desde userSlice

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch }) => {
    try {
      const userData = await login(email, password); // Llama al servicio de autenticación

      console.log("📥 Datos del usuario después del login:", userData);

      if (!userData) {
        throw new Error("Error al obtener los datos del usuario.");
      }

      // 🔥 Asegurar que `user_otp_configured` está definido en Redux
      dispatch(setUser({
        id: userData.id,
        email: userData.email,
        role: userData.role,
        user_otp_configured: userData.user_otp_configured || false, // 🔥 Asegurar que siempre tenga un valor
      }));

      return userData;
    } catch (error) {
      console.error("❌ Error en loginUser:", error);
      throw error;
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await logout(); // Llama al servicio de cierre de sesión
      dispatch(logout()); // Despacha la acción para limpiar el estado
      localStorage.removeItem('reduxState'); // Limpia el localStorage
    } catch (error) {
      throw error;
    }
  }
);