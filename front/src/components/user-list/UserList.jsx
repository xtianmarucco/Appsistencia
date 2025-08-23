import { useState } from "react";
import UserCard from "../user-card/UserCard";
import PropTypes from "prop-types";

export default function UserList({ users, onGenerateReceipt }) {
  const [search, setSearch] = useState("");

  // 🔥 Filtrar usuarios por nombre
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  // console.log("📊 Usuarios recibidos en el frontend:", users);

  return (
    <div className="">
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              totalShifts={Number(user.totalShifts || 0)}
              totalHours={Number(user.totalHours || 0)}
              onGenerateReceipt={onGenerateReceipt}
            />
          ))
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  // onGenerateReceipt: PropTypes.func.isRequired,
};
