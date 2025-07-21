import PropTypes from "prop-types";

export default function UserDetailCard({ user, stats }) {
  return (
    <section aria-label="Información del usuario" className="flex flex-row gap-4 items-stretch w-full">
      <article className="flex-1 bg-[#fafae0] shadow rounded p-6 flex flex-col justify-between min-h-[220px]" aria-label="Datos personales">
        <h2 className="text-xl font-semibold mb-4">Datos del Usuario</h2>
        <div>
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
        </div>
      </article>
      <article className="flex-1 bg-blue-50 shadow rounded p-6 flex flex-col justify-between min-h-[220px]" aria-label="Estadísticas del mes actual">
        <h2 className="text-xl font-semibold mb-4">Estadísticas del Mes Actual</h2>
        <div>
          <p>
            <strong>Turnos cubiertos:</strong> {stats.totalShifts ?? "N/A"}
          </p>
          <p>
            <strong>Horas trabajadas:</strong> {stats.totalHours ?? "N/A"}
          </p>
          <p>
            <strong>Mes:</strong> {stats.month}
          </p>
        </div>
      </article>
    </section>
  );
}

UserDetailCard.propTypes = {
  user: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
};
