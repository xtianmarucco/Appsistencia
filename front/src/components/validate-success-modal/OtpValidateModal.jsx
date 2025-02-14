import { logoutUser } from "../../thunks/authThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SuccessModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login"); // Redirige al usuario a la página de login
    });
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-lg font-bold text-green-600 mb-2">
          ✅ ¡Autenticador Configurado con Éxito!
        </h2>
        <p className="mb-4">
          Debes cerrar sesión y volver a loguearte para continuar.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
