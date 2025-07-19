import PropTypes from "prop-types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./UserShiftsCalendar.css"; // Asegúrate de tener este CSS para estilos personalizados

/**
 * Calendar component for displaying user shifts or events.
 * @param {Object} props
 * @param {Array} props.events - Array of event objects to display in the calendar.
 * @param {boolean} props.loading - Whether the calendar is loading data.
 * @param {string} [props.title] - Optional title for the calendar section.
 */
export default function UserShiftsCalendar({ events, loading, title = "Turnos Trabajados" }) {
  return (
    <section className="p-6" aria-label="Calendario de turnos">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {loading ? (
        <p>Cargando turnos...</p>
      ) : (
        <div className="rounded-lg p-4 shadow-lg border border-gray-200 bg-[var(--color-primary)] overflow-hidden">
          <div
            className="calendar-scroll-container"
            style={{
              maxHeight: "600px",
              overflowY: "auto",
              padding: 0,
              background: "var(--color-primary)",
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              events={events}
              locale="es"
              height="auto"
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              slotDuration="00:30:00"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay",
              }}
              buttonText={{
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día",
              }}
              headerToolbarClassNames="fc-toolbar-theme"
            />
          </div>
        </div>
      )}

    </section>
  );
}

UserShiftsCalendar.propTypes = {
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
};
