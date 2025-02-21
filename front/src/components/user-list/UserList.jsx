import { useState } from "react";
import UserCard from "../user-card/UserCard";

export default function UserList({ users }) {
  const [search, setSearch] = useState("");
  const [period, setPeriod] = useState("hoursLast7Days");

  // 🔥 Filtrar usuarios por nombre
  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="w-full p-2 border rounded mb-4"
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
      >
        <option value="hoursLast7Days">Últimos 7 días</option>
        <option value="hoursLast15Days">Últimos 15 días</option>
        <option value="hoursLast30Days">Últimos 30 días</option>
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} period={period} />)
        ) : (
          <p>No se encontraron usuarios.</p>
        )}
      </div>
    </div>
  );
}
