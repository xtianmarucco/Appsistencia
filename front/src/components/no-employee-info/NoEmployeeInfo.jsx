// src/components/EmptyState.jsx

export default function NoEmployeeInfo() {
  return (
    <div className="flex flex-col items-center justify-center h-72">
      {/* Emoji de trabajador */}
      <div className="text-6xl mb-4">🧑‍💼</div>
      {/* Frase */}
      <h2 className="text-lg font-semibold text-gray-700 text-center">
        Selecciona un rango de fechas para obtener la información de los usuarios.
      </h2>
    </div>
  );
}
