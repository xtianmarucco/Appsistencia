import { useEffect, useState } from "react";
import { fetchUserStats } from "../services/userDetailService"; // Importa tu service
import { useParams } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import UserDetailCard from "../components/user-detail/UserDetailCard";
import UserShiftsCalendar from "../components/user-calendar/UserShiftsCalendar";
import Footer from "../components/layout/Footer";
import { fetchUserShifts } from "../services/userShiftsService";

const UserDetailPage = () => {
  const { id: userId } = useParams(); // Obtiene el ID del usuario desde la URL
  
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null); // Para guardar stats: horas trabajadas, etc.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const loadUserDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchUserStats(userId);
        setUser(data.user);
        setStats(data.stats);
      } catch {
        setError("Error al obtener el detalle del usuario");
      } finally {
        setLoading(false);
      }
    };
    if (userId) loadUserDetail();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setLoadingEvents(true);
    fetchUserShifts(userId)
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoadingEvents(false));
  }, [userId]);

  if (loading) return <main className="p-8"><p>Cargando...</p></main>;
  if (error) return <main className="p-8 text-red-500">{error}</main>;
  if (!user || !stats) return <main className="p-8"><p>No hay datos</p></main>;

  return (
    <>
      <Navbar />
      <main className="p-8 mx-1.5" aria-label="Detalle del usuario">
        <header>
          <h1 className="text-2xl font-bold mb-6">Detalle del Usuario</h1>
        </header>
        <UserDetailCard user={user} stats={stats} />
        <section className="mt-8">
          <UserShiftsCalendar events={events} loading={loadingEvents} title="Turnos del Mes" />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default UserDetailPage;
