/* eslint-disable react/prop-types */
import { useState } from "react";

const LoginForm = ({ onSubmit, error, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="p-4 max-w-1.5xl bg-primary text-primary-text align-center flex flex-col items-center justify-center bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 max-w-md mx-auto p-6"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-neutral rounded text-primary-text bg-white"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-neutral rounded text-primary-text bg-white"
            required
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-400 text-white rounded w-full transition-opacity duration-200 ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              <svg
                className="inline w-4 h-4 mr-2 animate-spin"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8-8z"
                />
              </svg>
              Iniciando...
            </span>
          ) : (
            "Iniciar Sesión"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
