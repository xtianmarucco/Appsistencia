// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 text-center px-4">
      <FaExclamationTriangle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-2">Oops! Page not found.</p>
      <p className="mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/login"
        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFoundPage;