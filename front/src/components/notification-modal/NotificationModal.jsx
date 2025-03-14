import React from "react";

const NotificationModal = ({ isOpen, onClose, message, isError }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 🔹 Fondo con opacidad */}
      <div className="fixed inset-0 bg-gray-500 opacity-80"></div>

      {/* 🔹 Contenedor del Modal (sin opacidad) */}
      <div className="relative bg-white p-6 rounded shadow-lg text-center z-10">
        <h2 className={`text-lg font-bold ${isError ? "text-red-500" : "text-green-500"}`}>
          {isError ? "❌ Error" : "✅ Éxito"}
        </h2>
        <p className="mt-2">{message}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
