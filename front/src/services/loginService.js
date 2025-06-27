// src/services/loginService.js

const API_URL = `${import.meta.env.VITE_API_URL}/api/login`;

/**
 * Hace login usando el backend. Devuelve los datos del usuario si es correcto, sino lanza error.
 * @param {string} email
 * @param {string} password
 */
export const login = async (email, password) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    // Si la respuesta es 401 o cualquier error, lanza el mensaje que da el backend
    const errorData = await response.json();
    throw new Error(errorData.error || "Error en login");
  }

  // Si todo está bien, devolvés el usuario autenticado (sin la contraseña)
  const user = await response.json();
  return user;
};

export const logout = () => {
  // Podés limpiar localStorage o el estado global si hace falta
  return Promise.resolve();
};
