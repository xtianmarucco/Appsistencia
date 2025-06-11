import { useState } from "react";
import { createUser, updateUser } from "../services/userService";
import UserTable from "../components/user-table/UserTable";
import UserFormModal from "../components/user-form-modal/UserFormModal";
import NotificationModal from "../components/notification-modal/NotificationModal";
import Navbar from "../components/navbar/Navbar";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });

  // ✅ Crear usuario
  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      setIsModalOpen(false);
      setNotification({
        isOpen: true,
        message: "Usuario creado con éxito",
        isError: false,
      });
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
      setNotification({
        isOpen: true,
        message: "Error al crear usuario",
        isError: true,
      });
    }
  };

  // ✅ Editar usuario
  const handleEditUser = async (userData) => {
    try {
      await updateUser(userData);
      setIsModalOpen(false);
      setNotification({
        isOpen: true,
        message: "Usuario actualizado con éxito",
        isError: false,
      });
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
      setNotification({
        isOpen: true,
        message: "Error al actualizar usuario",
        isError: true,
      });
    }
  };

  // ✅ Cerrar el modal de notificación
  const handleCloseNotification = () => {
    setNotification({ isOpen: false, message: "", isError: false });
    window.location.reload(); // 🔥 Recargar usuarios después de editar/crear
  };

  return (
    <>
      <Navbar className="bg-color-secondary" />
      <div className="p-4 text-primary-text">
        <div className="p-6">
        <h1 className="text-2xl mb-6 font-bold">Panel de Administrador</h1>
       
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => {
              setEditingUser(null); // 🔥 Asegurar que el formulario se limpie
              setIsModalOpen(true);
            }}
          >
            ➕ Crear Usuario
          </button>

          {/* ✅ Pasamos el método onEdit correctamente */}
          <UserTable
            onEdit={(user) => {
              console.log("✏️ Editando usuario:", user);
              setEditingUser(user); // ✅ Asegurar que se pasa el usuario correcto
              setIsModalOpen(true);
            }}
          />

          {/* ✅ Modal de Crear/Editar Usuario */}
          <UserFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={editingUser ? handleEditUser : handleCreateUser}
            userData={editingUser}
          />

          {/* ✅ Modal de Notificación */}
          <NotificationModal
            isOpen={notification.isOpen}
            onClose={handleCloseNotification}
            message={notification.message}
            isError={notification.isError}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
