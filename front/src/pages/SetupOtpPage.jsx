import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import QrSetup from "../components/qr-generator/QrSetup";
import OtpValidation from "../components/otp-validator/OtpValidationA";
import OtpLoginValidation from "../components/otp-login-validation/OtpLoginValidation";

// Assuming hideOtpValidationModal is an action from a Redux slice
import { hideOtpValidationModal } from "../store/slices/userSlice";
import OtpValidateModal from "../components/validate-success-modal/OtpValidateModal";

export default function SetupOtpPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userOtpConfigured = useSelector(
    (state) => state.user.user_otp_configured
  );
  const [qrScanned, setQrScanned] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const showOtpModal = useSelector((state) => state.user.showOtpModal);

  // console.log("🧐 Intentando Renderizar el Modal - showOtpModal:", showOtpModal);

  useEffect(() => {
    // console.log("👀 SetupOtpPage - user_otp_configured:", userOtpConfigured);
  }, [userOtpConfigured]);

  useEffect(() => {
    if (user !== null) {
      setIsReady(true);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      // console.log("🔄 Forzando actualización de Redux en SetupOtpPage...");
      dispatch(setUser(user));
    }
  }, []);

  // console.log("👀 SetupOtpPage MONTADO - user_otp_configured:", userOtpConfigured);
  // console.log("📌 ¿QR Escaneado?:", qrScanned);

  if (!isReady) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <>
      <main
        className="flex flex-col justify-center bg-gradient-to-br from-blue-800 via-blue-500 to-cyan-400 items-center min-h-screen p-4"
        aria-label="Verificación OTP"
      >
        <section
          className="w-full max-w-xl flex flex-col items-center"
          aria-label="Acciones OTP"
        >
          <div className="mb-4">

            {/* ✅ Mostramos el modal si `showModal = true` */}
            {showOtpModal && (
              <OtpValidateModal
                onClose={() => dispatch(hideOtpValidationModal())}
              />
            )}
            {/* ✅ Si `user_otp_configured = true`, mostramos la segunda validación OTP */}
            {userOtpConfigured ? (
              <OtpLoginValidation />
            ) : !qrScanned ? (
              <QrSetup onScanned={() => setQrScanned(true)} />
            ) : (
              <OtpValidation
                onOtpSuccess={() => dispatch({ type: "user/showOtpModal" })}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
