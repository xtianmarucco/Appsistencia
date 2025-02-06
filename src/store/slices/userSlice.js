import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Datos del usuario
  role: null, // 'admin' o 'employee'
  user_otp_configured: false, // Indica si el usuario ha configurado OTP
  isAuthenticated: false, // Indica si el usuario está autenticado
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.role = action.payload?.role || null;
      state.user_otp_configured = action.payload?.user_otp_configured || false;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.user_otp_configured = false;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;