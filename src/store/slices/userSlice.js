import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  user_otp_configured: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload || {};
      state.user = userData;
      state.role = userData.role || null;
      state.user_otp_configured = userData.user_otp_configured ?? false;
    },
    setUserOtpConfigured: (state, action) => {
      state.user_otp_configured = action.payload;
    },
    logout: () => initialState, // Reinicia el estado al estado inicial
  },
});

// Exportar las acciones para usar en los componentes
export const { setUser, setUserOtpConfigured, logout } = userSlice.actions;

// Exportar el reducer para configurarlo en el store de Redux
export default userSlice.reducer;
