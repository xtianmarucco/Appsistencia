import { useEffect, useState } from "react";
import DateRangePicker from "../components/date-range-picker/DateRangePicker";
import ReceiptModal from "../components/receipt-modal/ReceiptModal";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/layout/Footer";

export default function UserDetail({ userId }) {
  const [user, setUser] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const fetchShifts = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${userId}/shifts?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const data = await response.json();
      setShifts(data);
    } catch (error) {
      console.error("❌ Error fetching shifts:", error);
    }
  };

  const handleGenerateReceipt = () => {
    const totalHours = shifts.reduce((sum, shift) => sum + (new Date(shift.end) - new Date(shift.start)) / 3600000, 0);
    const data = {
      user,
      shifts,
      totalHours,
      hourlyWage: 20, // Example hourly wage
      totalAmount: totalHours * 20,
    };
    setReceiptData(data);
    setShowModal(true);
  };

  return (
    <>
     <Navbar className="bg-color-secondary" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Detalle del Usuario</h2>
        {user && (
          <div className="mb-4">
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Rol:</strong> {user.role}</p>
          </div>
        )}

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <button
          onClick={fetchShifts}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Buscar Turnos
        </button>

        {shifts.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Turnos:</h3>
            <ul>
              {shifts.map((shift, index) => (
                <li key={index}>{shift.title}: {new Date(shift.start).toLocaleString()} - {new Date(shift.end).toLocaleString()}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleGenerateReceipt}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Generar Recibo
        </button>

        {showModal && (
          <ReceiptModal
            receiptData={receiptData}
            onSaveReceipt={() => console.log("Save receipt to DB")}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
