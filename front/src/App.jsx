import "./App.css";
// import UserList from "./components/usersList";


function App() {
  return (
    <>
      <div className="bg-primary text-secondary p-8">
        <h1 className="text-3xl text-primary-text font-bold">¡Bienvenido a mi aplicación!</h1>
        <p className="text-accent mt-4">
          Esto es un ejemplo de uso de colores personalizados.
        </p>

        <div>
          {/* <UserList></UserList> */}
        </div>
        <button className="bg-error text-white px-4 py-2 mt-4 rounded">
          Haz clic aquí
        </button>
      </div>
    </>
  );
}

export default App;
