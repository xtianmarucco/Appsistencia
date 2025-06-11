import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Importante
import { fetchUsers, deleteUser } from "../../services/userService";
import ConfirmModal from "../confirm-modal/ConfirmModal";

export default function UserTable({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    userId: null,
  });

  const navigate = useNavigate(); // <-- NUEVO

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
      setError("Error al obtener usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users]);

  const confirmDeleteUser = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  const handleConfirmDelete = async () => {
    if (!confirmModal.userId) return;

    try {
      setLoading(true);
      await deleteUser(confirmModal.userId);
      setUsers(users.filter((user) => user.id !== confirmModal.userId));
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
      setError("Error al eliminar el usuario.");
    } finally {
      setLoading(false);
      setConfirmModal({ isOpen: false, userId: null });
    }
  };

  return (
    <div className="pl-0 pt-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Buscar usuario..."
        className="border px-4 py-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Cargando usuarios...</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Rol</th>
            <th className="border border-gray-300 px-4 py-2">Estado</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="cursor-pointer hover:bg-blue-50"
              onClick={() => navigate(`/user-detail/${user.id}`)}
            >
              <td className="border border-gray-300 px-4 py-2">
                {user.name} {user.lastname}
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.active ? "✅ Activo" : "❌ Inactivo"}
              </td>
              <td
                className="border border-gray-300 px-4 py-2"
                onClick={(e) => e.stopPropagation()} // <-- Importante para que los botones no naveguen
              >
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
