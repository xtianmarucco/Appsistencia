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
      <Navbar />
      <main className="p-4 text-primary-text">
        <section className="p-6" aria-label="Admin Dashboard">
          <header>
            <h1 className="text-2xl mb-6 font-bold">Panel de Administrador</h1>
          </header>
          <section aria-label="Acciones de usuario">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mb-4"
              onClick={() => {
                setEditingUser(null);
                setIsModalOpen(true);
              }}
            >
              ➕ Crear Usuario
            </button>
            <UserTable
              onEdit={(user) => {
                setEditingUser(user);
                setIsModalOpen(true);
              }}
            />
          </section>
          <UserFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={editingUser ? handleEditUser : handleCreateUser}
            userData={editingUser}
          />
          <NotificationModal
            isOpen={notification.isOpen}
            onClose={handleCloseNotification}
            message={notification.message}
            isError={notification.isError}
          />
        </section>
      </main>
    </>
  );
};

export default AdminDashboard;
