import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../../services/userService";

export default function UserTable({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(""); // ✅ Estado para manejar errores
  const [loading, setLoading] = useState(false); // ✅ Estado de carga

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
      setError("Error al obtener usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar usuarios por nombre
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (userId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    try {
      setLoading(true); // 🔥 Activar loading
      await deleteUser(userId);
      console.log("✅ Usuario eliminado correctamente.");

      // 🔥 Recargar la lista de usuarios desde el backend
      loadUsers();
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
      setError("Error al eliminar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

      {/* 🔥 Mostrar errores si hay */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔍 Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar usuario..."
        className="border px-4 py-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🕒 Mostrar cargando si está en proceso */}
      {loading && <p>Cargando usuarios...</p>}

      {/* 📝 Tabla de usuarios */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Apellido</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.lastname}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.active ? "✅ Activo" : "❌ Inactivo"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => onEdit(user)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
