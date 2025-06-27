// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice"; 
// import userReducer from "./slices/userSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer, // Agregamos el slice de autenticación
//     user: userReducer // Agregamos el reducer del usuario

//   },
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/slices/userSlice';

// Función para cargar el estado desde localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// Función para guardar el estado en localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (error) {
    // Ignorar errores
  }
};

// Configuración de la store con el estado inicial cargado desde localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState, // Estado inicial desde localStorage
});

// Suscribirse a cambios en la store para guardar el estado en localStorage
store.subscribe(() => {
  saveState(store.getState());
});