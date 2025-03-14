import { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../../services/userService";
import ConfirmModal from "../confirm-modal/ConfirmModal"; // ✅ Importar el modal de confirmación

export default function UserTable({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // ✅ Nuevo estado para los usuarios filtrados
  const [search, setSearch] = useState("");
  const [error, setError] = useState(""); // ✅ Manejo de errores
  const [loading, setLoading] = useState(false); // ✅ Estado de carga
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null }); // ✅ Estado para modal

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔥 Cargar usuarios desde la API
  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data); // ✅ También actualizar `filteredUsers`
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
      setError("Error al obtener usuarios.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Filtrar usuarios al cambiar la búsqueda
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  // 🔥 Abrir modal de confirmación
  const confirmDeleteUser = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  // ✅ Confirmar eliminación del usuario
  const handleConfirmDelete = async () => {
    if (!confirmModal.userId) return;

    try {
      setLoading(true);
      await deleteUser(confirmModal.userId);
      console.log("✅ Usuario eliminado correctamente.");

      // 🔥 Actualizar lista sin hacer otra petición
      setUsers(users.filter((user) => user.id !== confirmModal.userId));
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
      setError("Error al eliminar el usuario.");
    } finally {
      setLoading(false);
      setConfirmModal({ isOpen: false, userId: null }); // 🔥 Cerrar modal
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
                  className="cursor-pointer px-2 py-1 rounded mr-2"
                  onClick={() => onEdit(user)}
                >
                  ✏️ 
                </button>
                <button
                  className="cursor-pointer px-2 py-1"
                  onClick={() => confirmDeleteUser(user.id)}
                >
                  🗑️ 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 Modal de Confirmación */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, userId: null })}
        onConfirm={handleConfirmDelete}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
      />
    </div>
  );
}
