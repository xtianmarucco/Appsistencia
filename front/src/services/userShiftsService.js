// src/services/userShiftsService.js

    const API_URL =  `${import.meta.env.VITE_API_URL}/api/users`;

    /**
     * Devuelve los eventos de turnos trabajados por el usuario (formato FullCalendar)
     */
    export async function fetchUserShifts(userId, { start, end } = {}) {
      if (!userId) throw new Error("userId es requerido");

      const params = new URLSearchParams();
      if (start) params.append("start", start);
      if (end) params.append("end", end);

      const response = await fetch(`${API_URL}/${userId}/shifts?${params}`);
      if (!response.ok) {
        throw new Error("No se pudieron obtener los turnos del usuario");
      }

      const data = await response.json();
      return data.shifts; // array de eventos para el calendario
    }

    /**
     * Devuelve resumen de turnos y horas trabajadas del usuario para el mes
     */
    export async function fetchUserShiftsSummary(userId, { start, end } = {}) {
      if (!userId) throw new Error("userId es requerido");

      const params = new URLSearchParams();
      if (start) params.append("start", start);
      if (end) params.append("end", end);

      const response = await fetch(`${API_URL}/${userId}/shifts?${params}`);
      if (!response.ok) {
        throw new Error("No se pudo obtener el resumen del usuario");
      }

      return response.json(); // { shifts, totalShifts, totalHours }
    }