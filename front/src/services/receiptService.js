// services/receiptService.js
export async function createReceipt(data) {
  const response = await fetch('/api/receipts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('No se pudo crear el recibo');
  }

  return response.json();
}