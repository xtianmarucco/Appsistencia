// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../thunks/loginThunk";

// Persistencia: leer usuario de localStorage si existe
const persistedUser = (() => {
  try {
    const data = localStorage.getItem("appsistencia_user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
})();

const initialState = {
  user: persistedUser || null,
  role: persistedUser?.role ?? null,
  user_otp_configured: persistedUser?.user_otp_configured ?? false,
  showOtpModal: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        id: action.payload.id || null,
        name: action.payload.name || "",
        lastname: action.payload.lastname || "",
        email: action.payload.email || "",
        role: action.payload.role || "",
        estado: action.payload.estado || "",
        user_otp_configured: action.payload.user_otp_configured || false,
      };
      state.role = action.payload.role ?? null;
      state.user_otp_configured = action.payload.user_otp_configured || false;
      state.error = null;
      // Guardar usuario en localStorage
      try {
        localStorage.setItem("appsistencia_user", JSON.stringify(state.user));
      } catch {}
    },
    setUserOtpConfigured: (state, action) => {
      state.user_otp_configured = action.payload;
    },
    showOtpValidationModal: (state) => {
      state.showOtpModal = true;
    },
    hideOtpValidationModal: (state) => {
      state.showOtpModal = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.role = null;
      state.user_otp_configured = false;
      state.showOtpModal = false;
      state.isLoading = false;
      state.error = null;
      // Eliminar usuario de localStorage
      try {
        localStorage.removeItem("appsistencia_user");
      } catch {/* ignore */}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id || null,
          name: action.payload.name || "",
          lastname: action.payload.lastname || "",
          email: action.payload.email || "",
          role: action.payload.role || "",
          estado: action.payload.estado || "",
          user_otp_configured: action.payload.user_otp_configured || false,
        };
        state.role = action.payload.role ?? null;
        state.user_otp_configured = action.payload.user_otp_configured || false;
        state.isLoading = false;
        state.error = null;
        // Guardar usuario en localStorage
        try {
          localStorage.setItem("appsistencia_user", JSON.stringify(state.user));
        } catch {}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error al iniciar sesión";
      });
  },
});

export const {
  setUser,
  setUserOtpConfigured,
  showOtpValidationModal,
  hideOtpValidationModal,
  setLoading,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
