import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import OtpValidationA from "../otp-validator/OtpValidationA";
import AttendanceSuccessModal from "./AttendanceSuccessModal";

const CheckInOutPanel = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [otpValidated, setOtpValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch attendance status only after OTP is validated
  useEffect(() => {
    if (!otpValidated || !user?.id) return;
    const fetchAttendanceStatus = async () => {
      setIsLoading(true);
      setErrorMsg("");
      try {
        console.log('[CheckInOutPanel] Fetching attendance status for user:', user.id);
        const res = await fetch(`/api/attendances/check-in-status/${user.id}`);
        const data = await res.json();
        console.log('[CheckInOutPanel] Attendance status response:', data);
        setAttendanceStatus(data);
      } catch (err) {
        setErrorMsg("Error fetching attendance status.");
        console.error('[CheckInOutPanel] Error fetching attendance status:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAttendanceStatus();
  }, [otpValidated, user?.id]);

  // Handler for OTP success
  const handleOtpSuccess = () => {
    setOtpValidated(true);
    setSuccessMsg("OTP validated! You can now check in/out.");
  };

  // Handler for check-in/out
  const handleCheckInOut = async (action) => {
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      console.log('[CheckInOutPanel] Attempting', action, 'for user:', user.id);
      const res = await fetch("/api/attendances/check-in-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await res.json();
      console.log('[CheckInOutPanel] Check-in/out response:', data);
      if (data.error) throw new Error(data.error);
      setShowModal(true);
      setSuccessMsg(data.message || "Acción registrada con éxito.");
    } catch (err) {
      setErrorMsg(err.message || "Error registering attendance.");
      console.error('[CheckInOutPanel] Error registering attendance:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!otpValidated) {
    return (
      <div>
        <OtpValidationA onSuccess={handleOtpSuccess} title={`Hola ${user?.name}, ingresa tu código de tu autenticador para continuar`} />
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        {successMsg && <p className="text-green-500 text-center">{successMsg}</p>}
      </div>
    );
  }

  // Handler para cerrar sesión y redirigir
  const handleLogout = () => {
    // Limpia el usuario en redux y localStorage
    dispatch({ type: 'user/logoutUser' });
    localStorage.removeItem("appsistencia_user");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex p-8  flex-col items-center">
      <p className="mb-2 font-semibold">
        {attendanceStatus?.canCheckIn
          ? `Bienvenido ${user?.name}, puedes registrar tu entrada.`
          : `Hasta luego ${user?.name}, puedes registrar tu salida.`}
      </p>
      <button
        onClick={() => handleCheckInOut(attendanceStatus?.canCheckIn ? "check-in" : "check-out")}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
        disabled={isLoading}
      >
        {attendanceStatus?.canCheckIn ? "Marcar Entrada" : "Marcar Salida"}
      </button>
      <AttendanceSuccessModal
        isOpen={showModal}
        onLogout={handleLogout}
        isCheckIn={attendanceStatus?.canCheckIn}
        message={successMsg || (attendanceStatus?.canCheckIn
          ? "¡Tu entrada fue registrada con éxito! Puedes cerrar esta ventana."
          : "¡Tu salida fue registrada con éxito! Puedes cerrar esta ventana.")}
      />
      {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
      {/* Aquí puedes mostrar el historial de turnos del día si lo deseas */}
    </div>
  );
};

export default CheckInOutPanel;