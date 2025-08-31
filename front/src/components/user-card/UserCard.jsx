import { useMemo } from "react";
import { FcBriefcase } from "react-icons/fc";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  // 🔥 Asignamos un emoji de perfil basado en el rol
  const emoji = useMemo(() => {
    return user.role === "admin" ? "👑" : "👤";
  }, [user.role]);


  const handleClick = () => {
  navigate(`/users/${user.id}/summary`);
};
  return (
    <div className="bg-white border-2 border-gray-100 p-4 rounded-lg shadow-md flex flex-col items-start space-y-4 cursor-pointer"
      onClick={handleClick}>
      <div className="flex items-center space-x-4">
        <span className="text-4xl">{emoji}</span>
        <div>
          <h3 className="text-lg font-bold">
            {user.name} {user.surname}
          </h3>
          <p className="text-gray-500 flex items-center">
            <FcBriefcase size={16} className="mr-2" />
            {user.role}
          </p>
          <p className={`text-sm font-semibold ${user.active ? 'text-green-600' : 'text-red-600'}`}>
            {user.active ? 'Activo' : 'Inactivo'}
          </p>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
};
