// src/pages/UserCalendarPage.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import UserShiftsCalendar from "../components/user-calendar/UserShiftsCalendar";
import { useParams } from "react-router-dom"; // Para obtener el userId de la URL
import { fetchUserShifts } from "../services/userShiftsService";

export default function UserCalendarPage() {
  const { userId } = useParams(); // <Route path="/user-calendar/:userId" ...>
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    fetchUserShifts(userId)
      .then(setEvents)
      .catch((err) => {
        // Puedes mostrar error en pantalla si lo deseas
        console.error("Error al cargar turnos:", err);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <>
     <Navbar /> 
      <main className="p-8 max-w-6xl mx-auto">
        <UserShiftsCalendar events={events} loading={loading} />
      </main>
    </>
  );
}
