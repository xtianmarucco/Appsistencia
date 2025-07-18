import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice"; // Asegúrate de tener este action
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login"); // Redirige al usuario a la página de login
    });
  };
  console.log(user.name);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-red-300 text-primary p-4 flex justify-between items-center shadow-lg">
      {/* Logo de la aplicación */}
      <div className="flex items-center">
        <span className="text-xl font-bold">Appsistencia</span>
        <span className="ml-2">⏰</span> {/* Icono de reloj */}
      </div>

      {/* Dropdown del usuario */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/dashboard")} // Redirige al dashboard
          className="text-primary-text hover:text-primary-dark"
        >
          holi
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/dashboard")} // Redirige al dashboard
          className="text-primary-text hover:text-primary-dark"
        >
          holi
        </button>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <span>{user?.name}</span> {/* Nombre del usuario */}
          <span>👤</span> {/* Icono de usuario */}
        </button>

        {/* Menú desplegable */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-primary-text rounded-lg shadow-lg">
            <button
              onClick={() => navigate("/profile")} // Redirige al perfil (lo implementaremos más adelante)
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
