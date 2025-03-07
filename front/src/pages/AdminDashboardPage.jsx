// import UserList from '../components/usersList';
import { useState } from "react";
import UserTable from "../components/user-table/UserTable";
// import UserFormModal from "../components/users/UserFormModal";
import Navbar from "../components/navbar/navbar";

const AdminDashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    console.log(`🗑️ Eliminando usuario con ID: ${userId}`);
  };

  return (
    <>
    <Navbar className="bg-color-secondary"/>
      <div className="p-4 text-primary-text">
        <h1 className="text-2xl font-bold">Panel de Administrador</h1>
      <div className="p-6">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        ➕ Crear Usuario
      </button>

      <UserTable onEdit={handleEditUser} onDelete={handleDeleteUser} />
{/* 
      {isModalOpen && (
        <UserFormModal user={userToEdit} onClose={() => setIsModalOpen(false)} />
      )} */}
    </div>

      </div>
    </>
  );
};

export default AdminDashboard;
