import { useMemo, useState } from "react";
import { FcBriefcase } from "react-icons/fc";
import PropTypes from "prop-types";
import ReceiptModal from "../receipt-modal/ReceiptModal";

export default function UserCard({ user, totalShifts, totalHours, onGenerateReceipt }) {
  // 🔥 Asignamos un emoji de perfil basado en el rol
  const emoji = useMemo(() => {
    return user.role === "admin" ? "👑" : "👤";
  }, [user.role]);

  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const handleGenerateReceipt = () => {
    const data = {
      name: user.name,
      period: "Julio 2025", // Example period
      totalShifts,
      totalHours,
      hourlyWage: 20, // Example hourly wage
      totalAmount: totalHours * 20, // Example calculation
    };
    setReceiptData(data);
    setShowModal(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-4xl">{emoji}</span>
        <div>
          <h3 className="text-lg font-bold">{user.name}</h3>
          <p className="text-gray-500 flex items-center">
            <FcBriefcase size={16} className="mr-2" />
            {user.role}
          </p>
        </div>
      </div>
      <div>
        <p className="text-gray-700">Turnos: {totalShifts || "N/A"}</p>
        <p className="text-gray-700">Horas trabajadas: {totalHours || "N/A"}</p>
      </div>
      <button
        onClick={handleGenerateReceipt}
        className="mt-2 px-4 py-2 border-2 border-blue-500 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        📄 Generar recibo
      </button>

      {showModal && (
        <ReceiptModal
          receiptData={receiptData}
          onSaveReceipt={() => onGenerateReceipt(user.id)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  totalShifts: PropTypes.number.isRequired,
  totalHours: PropTypes.number.isRequired,
  onGenerateReceipt: PropTypes.func.isRequired,
};
