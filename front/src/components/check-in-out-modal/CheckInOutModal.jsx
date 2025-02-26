import React from "react";

export default function CheckInOutModal({ isOpen, type, onClose, timestamp }) {
  if (!isOpen) return null;

  let title, message;
  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })
    : "N/A";

  if (type === "check-in") {
    title = "✅ Check-in Exitoso";
    message = `Tu entrada fue registrada a las ${formattedTime}.`;
  } else if (type === "check-out") {
    title = "✅ Check-out Exitoso";
    message = `Tu salida fue registrada a las ${formattedTime}.`;
  } else {
    title = "❌ Error en la operación";
    message = "Hubo un problema al procesar tu solicitud. Inténtalo nuevamente.";
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
