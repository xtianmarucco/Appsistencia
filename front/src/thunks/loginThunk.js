// src/store/thunks/loginThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/loginService"; // Asegurate de tener este servicio
import { setUser } from "../store/slices/userSlice"; // Asegurate de tener este action

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const user = await login(email, password);
      // Guardá el usuario en el slice
      dispatch(setUser(user));
      return user;
    } catch (error) {
      // Esto lo maneja el reducer de rejected
      return rejectWithValue(error.message);
    }
  }
);
export const logoutUser = () => {
  return (dispatch) => {
    // Podés limpiar el estado del usuario
    dispatch(setUser(null));
    // También podrías limpiar localStorage si es necesario
  };
};