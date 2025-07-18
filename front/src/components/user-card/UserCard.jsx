import { useMemo } from "react";
import { FcBriefcase } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// import { FcAssistant } from "react-icons/fc";

export default function UserCard({ user, period }) {
  // 🔥 Asignamos un emoji de perfil basado en el rol
  const emoji = useMemo(() => {
    return user.role === "admin" ? "👑" : "👤";
  }, [user.role]);

  console.log("🎯 Datos en UserCard:", user);

    const navigate = useNavigate();


  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
     onClick={() => navigate(`/user-calendar/${user.id}`)}
    >
      <span className="text-4xl">{emoji}</span>
      <div>
        <h3 className="text-lg font-bold">{user.name}</h3>
        <p className="text-gray-500 flex items-center">
          <FcBriefcase size={16} className="mr-2" />
          {user.role}
        </p>
        <p className="text-gray-700 flex items-center">
          ⏳ {user.totalHours} horas trabajadas
        </p>
      </div>
    </div>
  );
}
