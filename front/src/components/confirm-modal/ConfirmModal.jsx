export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* 🔹 Fondo oscuro con opacidad */}
        <div className="fixed inset-0 bg-gray-500 opacity-60"></div>
  
        {/* 🔹 Contenedor del modal */}
        <div className="relative bg-white p-6 rounded shadow-lg w-96 z-10">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{message}</p>
  
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-3 py-2 rounded"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }
  