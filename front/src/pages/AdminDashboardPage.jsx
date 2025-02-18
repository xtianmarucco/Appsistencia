// import UserList from '../components/usersList';

import Navbar from "../components/navbar/navbar";

const AdminDashboard = () => {
  return (
    <>
    <Navbar className="bg-color-secondary"/>
      <div className="p-4 text-primary-text">
        <h1 className="text-2xl font-bold">Panel de Administrador</h1>
        <p>#b03d34
          Bienvenido, administrador. Aquí puedes gestionar usuarios y ver
          reportes.
        </p>
        {/* <UserList/> */}

      </div>
    </>
  );
};

export default AdminDashboard;
