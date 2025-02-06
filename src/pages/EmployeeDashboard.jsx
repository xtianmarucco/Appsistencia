import UserList from "../components/usersList";

const EmployeeDashboard = () => {
    return (
      <div className="bg-red-400">
        <h1 className="">Panel de Empleado</h1>
        <p>Bienvenido, empleado. Aquí puedes registrar tu asistencia.</p>
        <UserList/>
      </div>
    );
  };
  
  export default EmployeeDashboard;