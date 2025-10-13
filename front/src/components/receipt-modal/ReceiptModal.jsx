import { useState } from "react";
import { Document, Page, pdf } from "@react-pdf/renderer";
import Html from "react-pdf-html";
import { createReceipt } from "../../services/receiptService";

const ReceiptModal = ({ user, summary, dateRange, onClose }) => {
  const [observations, setObservations] = useState("");

  const handleSave = async (generate = false) => {
    try {
      // 1. Preparar el recibo a guardar
      const receiptData = {
        user_id: user.id,
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
        total_hours: summary.totalHours,
        total_shifts: summary.totalShifts,
        hourly_wage: user.hourly_wage,
        total_amount: summary.totalAmount,
      };

      // 2. Guardar el recibo en la base de datos
      const savedReceipt = await createReceipt(receiptData);

      // 3. Si se pidió generar y descargar el PDF
      if (generate) {
        const html = `
          <div>
            <h1>Recibo de Pago</h1>
            <p><strong>Nombre:</strong> ${user.name} ${user.lastname}</p>
            <p><strong>Periodo:</strong> ${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}</p>
            <p><strong>Turnos trabajados:</strong> ${summary.totalShifts}</p>
            <p><strong>Horas trabajadas:</strong> ${summary.totalHours}</p>
            <p><strong>Total a cobrar:</strong> $${summary.totalAmount.toFixed(2)}</p>
            <p><strong>Observaciones:</strong> ${observations || "Ninguna"}</p>
          </div>
        `;

        const receiptDoc = (
          <Document>
            <Page size="A4" style={{ padding: 24 }}>
              <Html>{html}</Html>
            </Page>
          </Document>
        );

        // Generar y descargar el archivo PDF
        const blob = await pdf(receiptDoc).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Recibo-${user.name}-${user.lastname}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      }

      // 4. Cerrar modal
      onClose();
    } catch (err) {
      console.error("Error al guardar recibo:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4 text-center">Generar Recibo</h2>

        <div className="mb-4">
          <p><strong>Nombre:</strong> {user.name} {user.lastname}</p>
          <p><strong>Periodo:</strong> {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}</p>
          <p><strong>Turnos:</strong> {summary.totalShifts}</p>
          <p><strong>Horas:</strong> {summary.totalHours}</p>
          <p><strong>Total a cobrar:</strong> ${summary.totalAmount.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Observaciones:</label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Opcional"
            rows={3}
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => handleSave(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar recibo
          </button>
          <button
            onClick={() => handleSave(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Guardar y descargar PDF
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ReceiptModal;
