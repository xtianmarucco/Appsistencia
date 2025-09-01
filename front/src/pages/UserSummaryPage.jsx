import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader/Loader";
import DateRangePicker from "../components/date-range-picker/DateRangePicker";
import { fetchUserShiftsSummary } from "../services/userShiftsService";
import ReceiptModal from "../components/receipt-modal/ReceiptModal"; // Asegurate de tenerlo creado y exportado

const UserSummaryPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState(null);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [summaryData, setSummaryData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get(`/api/users/${id}`);
      setUser(userRes.data);

      const summaryRes = await fetchUserShiftsSummary(id);
      setSummary(summaryRes);
    };

    fetchData();
  }, [id]);

  const handleDateChange = async ({ startDate, endDate }) => {
    setDateRange({ startDate, endDate });

    if (!user || !startDate || !endDate) return;

    try {
      const res = await fetchUserShiftsSummary(user.id, {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      });

      const totalAmount = res.totalHours * user.hourly_wage;

      setSummaryData({
        ...res,
        totalAmount,
      });
    } catch (error) {
      console.error("Error al obtener el resumen personalizado:", error);
    }
  };

  if (!user || !summary) return <Loader />;

  const showCustomSummary = summaryData !== null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white border-2 border-gray-100 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Resumen del Usuario</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Información del usuario</h3>
        <p><span className="font-medium">Nombre:</span> {user.name} {user.lastname}</p>
        <p><span className="font-medium">Rol:</span> {user.role}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {showCustomSummary ? "Resumen del período seleccionado" : "Resumen del mes actual"}
        </h3>
        <p><span className="font-medium">Turnos trabajados:</span> {showCustomSummary ? summaryData.totalShifts : summary.totalShifts}</p>
        <p><span className="font-medium">Horas trabajadas:</span> {showCustomSummary ? summaryData.totalHours : summary.totalHours}</p>
        <p><span className="font-medium">Pago estimado:</span> ${showCustomSummary ? summaryData.totalAmount.toFixed(2) : (summary.totalHours * user.hourly_wage).toFixed(2)}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Seleccionar rango personalizado</h3>
        <DateRangePicker onChange={handleDateChange} onDateChange={handleDateChange} />
      </div>

      {showCustomSummary && (
        <div className="text-left">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Generar recibo con este rango
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <ReceiptModal
          user={user}
          summary={summaryData}
          dateRange={dateRange}
          onClose={() => setModalOpen(false)}
        />
      )}

      {modalOpen && <div>Modal abierto</div>}
    </div>
  );
};

export default UserSummaryPage;