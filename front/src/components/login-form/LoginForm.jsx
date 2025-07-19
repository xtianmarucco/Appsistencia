/* eslint-disable react/prop-types */
import { useState } from "react";

const LoginForm = ({ onSubmit, error, isLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value) => {
    if (!value) return "El email es obligatorio.";
    // Validación simple de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "El formato del email no es válido.";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "La contraseña es obligatoria.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    if (!emailValidation && !passwordValidation) {
      onSubmit({ email, password });
    }
  };

  return (
    <section className="p-8 w-full max-w-[600px] bg-white text-primary-text flex flex-col items-center justify-center rounded shadow-lg" aria-label="Login Form">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full"
        aria-label="Formulario de inicio de sesión"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            className={`w-full p-2 border rounded text-primary-text bg-white ${emailError ? "border-red-500" : "border-neutral"}`}
            disabled={isLoading}
            aria-invalid={!!emailError}
            aria-describedby="email-error"
            autoComplete="username"
          />
          {emailError && <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            className={`w-full p-2 border rounded text-primary-text bg-white ${passwordError ? "border-red-500" : "border-neutral"}`}
            disabled={isLoading}
            aria-invalid={!!passwordError}
            aria-describedby="password-error"
              autoComplete="current-password"
          />
          {passwordError && <p id="password-error" className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>
        {/* Error global (por ejemplo, contraseña incorrecta) */}
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
    </section>
  );
};

export default LoginForm;
