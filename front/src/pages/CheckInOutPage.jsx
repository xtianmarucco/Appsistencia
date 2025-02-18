import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/navbar"

export default function CheckInOutPage() {
  const user = useSelector((state) => state.user.user);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí podríamos hacer una petición al backend para ver si el usuario ya hizo check-in hoy
    setLoading(false);
  }, []);

  const handleCheckIn = async () => {
    setHasCheckedIn(true);
    // Enviar la información al backend
  };

  const handleCheckOut = async () => {
    setHasCheckedIn(false);
    // Enviar la información al backend
  };

  if (loading) return <p>Cargando información...</p>;

  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">Registro de Entrada/Salida</h2>
      <p className="text-lg">Bienvenido, {user?.username} {user?.lastname}</p>

      {hasCheckedIn ? (
        <button
          onClick={handleCheckOut}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4"
        >
          Marcar Salida
        </button>
      ) : (
        <button
          onClick={handleCheckIn}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
        >
          Marcar Entrada
        </button>
      )}
    </div>
    </>
   
  );
}
