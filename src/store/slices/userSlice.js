import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: null, // 'admin' o 'employee'
  user_otp_configured: false, // Indica si el usuario ha configurado OTP
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserOtpConfigured: (state, action) => {
      state.user_otp_configured = action.payload;
    },
  },
});

export const { setRole, setUserOtpConfigured } = userSlice.actions;
export default userSlice.reducer;