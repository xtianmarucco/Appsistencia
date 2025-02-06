import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from '../services/authServices'; // Importa login y logout
import { setUser } from '../store/slices/userSlice'; // Importa setUser desde userSlice

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch }) => {
    const userData = await login(email, password); // Llama al servicio de autenticación
    dispatch(setUser(userData)); // Actualiza el estado de Redux con los datos del usuario
    return userData;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    await logout(); // Llama al servicio de cierre de sesión
    dispatch(setUser(null)); // Limpia el estado de Redux
  }
);