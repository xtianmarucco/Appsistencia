// import UserList from "../components/usersList";
import Navbar from "../components/navbar/Navbar";


const EmployeeDashboard = () => {
  return (
    <>
      <Navbar />
      <main className="p-4 text-primary-text">
        <header>
          <h1 className="text-2xl mb-4 font-bold">Panel de Empleado</h1>
        </header>
        <section aria-label="Bienvenida empleado">
          <p>Bienvenido, empleado. Aquí puedes registrar tu asistencia.</p>
          {/* <UserList /> */}
        </section>
      </main>
    </>
  );
};

export default EmployeeDashboard;
