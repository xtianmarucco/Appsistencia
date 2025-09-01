const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

export async function fetchUserShifts(userId, { start, end } = {}) {
  if (!userId) throw new Error("userId es requerido");

  const params = new URLSearchParams();
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const query = params.toString();
  const response = await fetch(`${API_URL}/${userId}/shifts${query ? `?${query}` : ""}`);
  if (!response.ok) {
    throw new Error("No se pudieron obtener los turnos del usuario");
  }

  const data = await response.json();
  return data.shifts;
}

export async function fetchUserShiftsSummary(userId, { start, end } = {}) {
  if (!userId) throw new Error("userId es requerido");

  const params = new URLSearchParams();
  if (start) params.append("start", start);
  if (end) params.append("end", end);

  const query = params.toString();
  const response = await fetch(`${API_URL}/${userId}/shifts${query ? `?${query}` : ""}`);
  if (!response.ok) {
    throw new Error("No se pudo obtener el resumen del usuario");
  }

  return response.json();
}