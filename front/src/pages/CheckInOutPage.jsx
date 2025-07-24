import CheckInOutPanel from "../components/checkinout/CheckInOutPanel";

export default function CheckInOutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-2" aria-label="Registro de Entrada/Salida">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col items-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-2 drop-shadow">Registro de Entrada/Salida</h1>
        <section className="w-full flex flex-col items-center" aria-label="Acciones de asistencia">
          <CheckInOutPanel />
        </section>
      </div>
    </main>
  );
}