import UserList from '../components/usersList';

const AdminDashboard = () => {
  return (
    <>
      <div className="p-4 bg-red-400 text-primary-text">
        <h1 className="text-2xl font-bold">Panel de Administrador</h1>
        <p>
          Bienvenido, administrador. Aquí puedes gestionar usuarios y ver
          reportes.
        </p>
        {/* <UserList/> */}

      </div>
    </>
  );
};

export default AdminDashboard;
