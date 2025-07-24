
const AttendanceSuccessModal = ({ isOpen, onLogout, isCheckIn, message }) => {
  console.log('[AttendanceSuccessModal] Rendered with:', { isOpen, isCheckIn, message });
  if (!isOpen) {
    console.log('[AttendanceSuccessModal] Modal not open');
    return null;
  }

  // Unifica el cierre: cualquier botón cierra sesión y redirige
  const handleClose = () => {
    console.log('[AttendanceSuccessModal] handleClose called');
    if (onLogout) {
      console.log('[AttendanceSuccessModal] onLogout exists, calling...');
      onLogout();
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop que cubre toda la pantalla */}
      <div className="absolute inset-0 bg-grey bg-opacity-60 backdrop-blur-sm"></div>
      {/* Contenedor del Modal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center z-10">
          <h2 className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">✅</span>
            {isCheckIn ? "Entrada registrada" : "Salida registrada"}
          </h2>
          <p className="mb-6 text-gray-700 font-semibold text-lg">{message}</p>
          <button
            onClick={handleClose}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSuccessModal;
