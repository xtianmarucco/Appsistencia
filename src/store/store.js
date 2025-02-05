import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // Agregamos el slice de autenticación
    user: userReducer // Agregamos el reducer del usuario

  },
});

export default store;
