import { useSelector, useDispatch } from 'react-redux';
import { setRole, setUserOtpConfigured } from '../../store/slices/userSlice';

const UserProfile = () => {
  const role = useSelector((state) => state.user.role);
  const userOtpConfigured = useSelector((state) => state.user.user_otp_configured);
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulamos un inicio de sesión exitoso
    dispatch(setRole('admin')); // Cambiamos el rol a 'admin'
    dispatch(setUserOtpConfigured(true)); // Marcamos OTP como configurado
  };

  return (
    <div className="p-4 bg-primary text-primary-text">
      <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      <p>Rol: {role || 'No definido'}</p>
      <p>OTP Configurado: {userOtpConfigured ? 'Sí' : 'No'}</p>
      <button
        onClick={handleLogin}
        className="mt-4 px-4 py-2 bg-accent text-white rounded"
      >
        Simular Inicio de Sesión
      </button>
    </div>
  );
};

export default UserProfile;