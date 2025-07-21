import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, logoutUser } from "../store/slices/userSlice";
import CheckInOutModal from "../components/check-in-out-modal/CheckInOutModal";
import Footer from "../components/layout/Footer";

export default function CheckInOutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    // Consultar si el usuario tiene un check-in activo
    const fetchCheckInStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/attendances/check-in-status/${user.id}`
        );
        const data = await response.json();
        setHasCheckedIn(data.hasCheckedIn);
      } catch (error) {
        console.error("❌ Error al verificar check-in:", error);
      }
    };

    fetchCheckInStatus();
  }, [user]);

  const handleCheckInOut = async (actionType) => {
    if (!user) return;

    setIsLoading(true);
    dispatch(setLoading(true));

    try {
      const response = await fetch(
        "http://localhost:3000/api/attendances/check-in-out",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: user.id }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setModalType(actionType);
        setTimestamp(new Date());
        setHasCheckedIn(actionType === "check-in");
      } else {
        setModalType("error");
      }

      setModalOpen(true);
    } catch (error) {
      setModalType("error");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);

    if (modalType === "check-in" || modalType === "check-out") {
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  return (
    <>
      <main className="flex flex-col items-center p-4" aria-label="Registro de Entrada/Salida">
        <header>
          <h1 className="text-2xl font-bold mb-4">Registro de Entrada/Salida</h1>
        </header>
        <section className="w-full max-w-xl flex flex-col items-center" aria-label="Acciones de asistencia">
          <p className="text-lg mb-4">
            Usuario: {user.name} {user.lastname}
          </p>
          <p className="text-xl font-mono mb-6">
            🕒 {new Date().toLocaleTimeString()}
          </p>
          {!hasCheckedIn ? (
            <button
              onClick={() => handleCheckInOut("check-in")}
              disabled={isLoading}
              className={`px-6 py-3 rounded text-white text-lg font-bold ${
                isLoading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isLoading ? "Procesando..." : "Marcar Entrada"}
            </button>
          ) : (
            <button
              onClick={() => handleCheckInOut("check-out")}
              disabled={isLoading}
              className={`px-6 py-3 rounded text-white text-lg font-bold ${
                isLoading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading ? "Procesando..." : "Marcar Salida"}
            </button>
          )}
          {modalOpen && (
            <CheckInOutModal
              isOpen={modalOpen}
              type={modalType}
              timestamp={timestamp}
              onClose={handleCloseModal}
              user={user}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
