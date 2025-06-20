// src/services/userShiftsService.js

const API_URL = "http://localhost:3000/api/users"; // Ajusta si cambiaste el host/puerto

/**
 * Obtiene los turnos trabajados por un usuario (formato FullCalendar)
 * @param {string} userId - El ID del usuario
 * @returns {Promise<Array>} Lista de turnos [{ title, start, end }]
 */
export async function fetchUserShifts(userId) {
  if (!userId) throw new Error("userId es requerido");

  const response = await fetch(`${API_URL}/${userId}/shifts`);
  if (!response.ok) {
    throw new Error("No se pudieron obtener los turnos del usuario");
  }
  return response.json(); // Esto será un array de eventos [{title, start, end}]
}
