import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../thunks/authThunks';
import LoginForm from '../components/login-form/LoginForm';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async ({ email, password }) => {
    setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');

    try {
      const userData = await dispatch(loginUser({ email, password })).unwrap();
      // Redirige al panel correspondiente según el rol del usuario
      navigate(userData.role === 'admin' ? '/admin' : '/employee');
    } catch (error) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-4 bg-primary text-primary-text">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default Login;