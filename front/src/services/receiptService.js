const API_URL = import.meta.env.VITE_API_URL;

/**
 * Guarda un recibo
 */
export async function createReceipt(data) {
  const response = await fetch(`${API_URL}/api/receipts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al guardar el recibo");
  }

  const json = await response.json();
  return json.receipt;
}

/**
 * Obtiene los recibos de un usuario
 */
export async function getReceiptsByUser(userId) {
  if (!userId) throw new Error("userId es requerido");

  const response = await fetch(`${API_URL}/api/receipts/user/${userId}`);

  if (!response.ok) {
    throw new Error("Error al obtener los recibos del usuario");
  }

  const json = await response.json();
  return json.receipts;
}