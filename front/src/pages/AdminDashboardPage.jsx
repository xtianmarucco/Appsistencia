// import UserList from '../components/usersList';
import { useState } from "react";
import { createUser, updateUser } from "../services/userService"; 

import UserTable from "../components/user-table/UserTable";
import UserFormModal from "../components/user-form-modal/UserFormModal";
import Navbar from "../components/navbar/navbar";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleCreateUser = async (userData) => {
    try {
      await createUser(userData);
      setIsModalOpen(false);
      window.location.reload(); // Recargar la lista de usuarios
    } catch (error) {
      console.error("❌ Error al crear usuario:", error);
    }
  };

  const handleEditUser = async (userData) => {
    try {
      await updateUser(userData);
      setIsModalOpen(false);
      window.location.reload(); // Recargar la lista de usuarios
    } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
    }
  };


  const handleDeleteUser = (userId) => {
    console.log(`🗑️ Eliminando usuario con ID: ${userId}`);
  };

  return (
    <>
      <Navbar className="bg-color-secondary" />
      <div className="p-4 text-primary-text">
        <h1 className="text-2xl font-bold">Panel de Administrador</h1>
        <div className="p-6">
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

          <UserFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={editingUser ? handleEditUser : handleCreateUser}
            userData={editingUser}
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
