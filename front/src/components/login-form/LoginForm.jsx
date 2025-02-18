/* eslint-disable react/prop-types */
import { useState } from 'react';

const LoginForm = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-neutral rounded text-primary-text bg-white"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-neutral rounded text-primary-text bg-white"
          required
        />
      </div>
      {error && <p className="text-error mb-4">{error}</p>}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-400 text-white rounded"
      >
        Iniciar Sesión
      </button>
    </form>
  );
};

export default LoginForm;