import PropTypes from "prop-types";
import html2pdf from "html2pdf.js";

export default function ReceiptModal({
  receiptData,
  onSaveReceipt,
  onClose,
}) {
  const handleDownloadPDF = () => {
    const element = document.getElementById("receipt-content");
    html2pdf().from(element).save();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Detalle del Recibo</h2>
        <div id="receipt-content">
          <p><strong>Nombre:</strong> {receiptData.name}</p>
          <p><strong>Período:</strong> {receiptData.period}</p>
          <p><strong>Turnos:</strong> {receiptData.totalShifts}</p>
          <p><strong>Horas trabajadas:</strong> {receiptData.totalHours}</p>
          <p><strong>Valor por hora:</strong> ${receiptData.hourlyWage}</p>
          <p><strong>Total a pagar:</strong> ${receiptData.totalAmount}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onSaveReceipt}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar recibo
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Descargar PDF
          </button>
        </div>
        <button
          onClick={onClose}

          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

ReceiptModal.propTypes = {
  receiptData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    totalShifts: PropTypes.number.isRequired,
    totalHours: PropTypes.number.isRequired,
    hourlyWage: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired,
  }).isRequired,
  onSaveReceipt: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
