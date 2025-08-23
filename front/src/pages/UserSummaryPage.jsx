// front/src/pages/UserSummaryPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";

const UserSummaryPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get(`/api/users/${id}`);
        const statsRes = await axios.get(`/api/users/${id}/shifts`);
        setUser(userRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Error fetching user summary data", err);
      }
    };
    fetchUserData();
  
  }, [id]);

  if (!user || !stats) return <Loader/>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Resumen del Usuario</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Apellido:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
        <hr className="my-4" />
        <p><strong>Total de turnos este mes:</strong> {stats.totalShifts}</p>
        <p><strong>Total de horas trabajadas:</strong> {stats.totalHours}</p>
        <p><strong>Precio por hora:</strong> ${user.hourly_wage}</p>
      </div>
    </div>
  );
};

export default UserSummaryPage;