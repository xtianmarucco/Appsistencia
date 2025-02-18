import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  user_otp_configured: false,
  showOtpModal: false, // 🔥 Aseguramos que está en el estado inicial
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.user_otp_configured = action.payload.user_otp_configured;
    },
    setUserOtpConfigured: (state, action) => {
      state.user_otp_configured = action.payload;
    },
    showOtpValidationModal: (state) => {
      console.log("🚀 Activando showOtpModal en Redux");
      state.showOtpModal = true;
    },
    hideOtpValidationModal: (state) => {
      console.log("🛑 Ocultando showOtpModal en Redux");
      state.showOtpModal = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.role = null;
      state.user_otp_configured = false;
      state.showOtpModal = false;
    },
  },
});

export const {
  setUser,
  setUserOtpConfigured,
  showOtpValidationModal,
  hideOtpValidationModal,
  logoutUser,
} = userSlice.actions;
export default userSlice.reducer;
