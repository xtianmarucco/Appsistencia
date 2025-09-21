import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const userName = user?.name || user?.nombre || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login"); 
    });
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-br from-blue-800 via-blue-500 to-cyan-400 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
    
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        <span className="text-xl font-bold">Appsistencia</span>
        <span className="ml-2">⏰</span> 
      </div>

      {user?.role === "admin" && (
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/admin")}
            className="hover:no-underline focus:no-underline cursor-pointer"
            style={{ textDecoration: "none" }}
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => navigate("/user-list")}
            className="hover:no-underline focus:no-underline cursor-pointer"
            style={{ textDecoration: "none" }}
          >
            Users List
          </button>
        </div>
      )}

      <div className="relative">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="text-base font-semibold">Hola {userName}</span>{" "}
            <span>👤</span> 
          </button>
        </div>

   
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-blue-800 via-blue-500 to-cyan-400 text-white rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={() => navigate("/profile")}
              className="block w-full px-4 py-2 text-left hover:bg-blue-600 focus:bg-blue-700 focus:outline-none transition-colors duration-150 rounded-none cursor-pointer"
              style={{ textDecoration: "none" }}
            >
              Perfil
            </button>
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-blue-600 focus:bg-blue-700 focus:outline-none transition-colors duration-150 rounded-none cursor-pointer"
              style={{ textDecoration: "none" }}
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
