import { useState } from "react";
import UserCard from "../user-card/UserCard";

export default function UserList({ users }) {
  const [search, setSearch] = useState("");

  // 🔥 Filtrar usuarios por nombre
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log("📊 Usuarios recibidos en el frontend:", users);

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
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
}
