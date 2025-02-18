import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function OtpValidateModal({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("🎉 Renderizando OtpValidateModal...");

  const handleClose = () => {
    console.log("🚪 Cerrando sesión... mostrando el modal de éxito");
    dispatch(logoutUser()); // 🔥 Cierra sesión
    navigate("/login"); // 🔥 Redirige al login
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h2 className="text-lg font-bold text-green-600">✅ Autenticador Conectado</h2>
        <p className="mt-2 text-gray-700">
          Tu autenticador se ha configurado correctamente. <br />
          Cierra sesión y vuelve a iniciar sesión para marcar tu entrada o salida.
        </p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
