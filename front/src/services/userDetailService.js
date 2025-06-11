
// userDetailService.js
/**
 * Obtiene el detalle de un usuario (información + estadísticas)
 * @param {string} userId - El ID del usuario a consultar
 * @returns {Promise<{ user: Object, stats: Object }>} - Detalle y stats del usuario
 */
export const fetchUserStats = async (userId) => {
  // 🔹 Armamos la URL del endpoint del backend
  const url = `http://localhost:3000/api/users/${userId}/stats`;

  // 🔹 Hacemos la petición al backend
  const response = await fetch(url);

  // 🔹 Si falla, lanzamos un error
  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle del usuario");
  }

  // 🔹 Parseamos la respuesta a JSON y la retornamos
  return response.json(); // { user, stats }
};
