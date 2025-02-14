import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: null, // Puede ser "admin" o "employee"
  userOtpConfigured: false, // Indica si el usuario tiene OTP configurado
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserOtpConfigured: (state, action) => {
      state.userOtpConfigured = action.payload;
    },
    logout: (state) => {
      state.role = null;
      state.userOtpConfigured = false;
    },
  },
});

export const { setRole, setUserOtpConfigured, logout } = authSlice.actions;
export default authSlice.reducer;
