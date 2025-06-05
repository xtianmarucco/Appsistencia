// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../thunks/loginThunk"; // <-- Importá el thunk (deberás crearlo con el nombre correcto)

const initialState = {
  user: null,
  role: null,
  user_otp_configured: false,
  showOtpModal: false,
  isLoading: false,
  error: null, // <-- Agregado para manejar errores de login
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.user_otp_configured = action.payload.user_otp_configured;
      state.error = null;
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.role;
        state.user_otp_configured = action.payload.user_otp_configured;
        state.isLoading = false;
        state.error = null;
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
