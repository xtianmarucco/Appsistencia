import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  user_otp_configured: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.user_otp_configured = action.payload?.user_otp_configured ?? false;
    },
    setUserOtpConfigured: (state, action) => {
      state.user_otp_configured = action.payload;
    },
  },
});

// Exporta las acciones
export const { setUser, setUserOtpConfigured } = userSlice.actions;

// Exporta el reducer
export default userSlice.reducer;
