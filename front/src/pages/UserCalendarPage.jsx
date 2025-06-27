// src/pages/UserCalendarPage.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Si necesitas vistas de tiempo
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
      <div className="p-8 max-w-6xl">
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Turnos Trabajados</h2>
      {loading ? (
        <p>Cargando turnos...</p>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]} // Agrega timeGridPlugin si necesitas vistas de tiempo
          initialView="timeGridWeek"
          events={events} // Aquí llegan los turnos del backend
          locale="es"
          height="auto"
          slotMinTime="00:00:00" // Empieza a las 00:00
          slotMaxTime="24:00:00" // Termina a las 24:00
          slotDuration="00:30:00"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay",
          }}
          // Cada fila = 30 minutos
        />
      )}
      </div>
    </div>
    </>
  );
}
