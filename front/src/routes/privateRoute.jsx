import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({  children, requiredRole }) => {
  const role = useSelector((state) => state.user.role);

  console.log('Role:', role);
  console.log('requiredRole:', requiredRole);

  // Verifica si el usuario está autenticado y tiene el rol requerido
  if ( role !== requiredRole) {
    console.log('Redirigiendo al login...');
    return <Navigate to="/login" replace />;
  }

  // Renderiza la página solicitada
  return children;
};

export default PrivateRoute;