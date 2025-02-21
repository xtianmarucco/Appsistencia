import { useEffect, useState } from "react";
import UserList from "../components/user-list/UserList";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/users");
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("❌ Error al obtener usuarios:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/hours");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("❌ Error al obtener usuarios con horas trabajadas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
      {loading ? <p>Cargando...</p> : <UserList users={users} />}
    </div>
  );
}
