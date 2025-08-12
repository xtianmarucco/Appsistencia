// services/receiptService.js
export const saveReceipt = async (receiptData) => {
  const response = await fetch("http://localhost:3000/api/receipts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(receiptData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al guardar recibo");
  }
  return await response.json();
};