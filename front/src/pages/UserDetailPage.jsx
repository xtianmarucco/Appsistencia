import { useEffect, useState } from "react";
import { fetchUserStats } from "../services/userDetailService"; // Importa tu service
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const UserDetailPage = () => {
  const { id: userId } = useParams(); // Obtiene el ID del usuario desde la URL
  
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null); // Para guardar stats: horas trabajadas, etc.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserDetail = async () => {
      setLoading(true);
      setError("");
      try {
        // Llama al service que creamos
        const data = await fetchUserStats(userId);

        // Actualiza los estados con los datos recibidos
        setUser(data.user);
        setStats(data.stats);
      } catch (err) {
        setError("Error al obtener el detalle del usuario");
      } finally {
        setLoading(false);
      }
    };

    if (userId) loadUserDetail();
  }, [userId]);

  // Render simple de ejemplo:
  if (loading) return <p>Cargando...</p>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!user || !stats) return <p>No hay datos</p>;
  

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-2xl mr-auto">
        <h2 className="text-2xl font-bold mb-6">Detalle del Usuario</h2>
        {user && (
          <div className="bg-white shadow rounded p-6 mb-4">
            <p>
              <strong>Nombre:</strong> {user.name} {user.lastname}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Rol:</strong> {user.role}
            </p>
            <p>
              <strong>Estado:</strong> {user.active ? "Activo" : "Inactivo"}
            </p>
            {/* Agrega más info si la necesitas */}
          </div>
        )}

        {stats && (
          <div className="bg-blue-50 shadow rounded p-6">
            <h3 className="text-xl font-semibold mb-4">
              Estadísticas del Mes Actual
            </h3>
            <p>
              <strong>Turnos cubiertos:</strong> {stats.totalShifts ?? "N/A"}
            </p>
            <p>
              <strong>Horas trabajadas:</strong> {stats.totalHours ?? "N/A"}
            </p>
            <p>
              <strong>Mes:</strong> {stats.month}
            </p>

            {/* Agrega más métricas según tu endpoint */}
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetailPage;
