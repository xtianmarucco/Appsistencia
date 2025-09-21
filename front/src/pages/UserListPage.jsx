import { useEffect, useState } from "react";
import UserList from "../components/user-list/UserList";
 import Navbar from "../components/navbar/Navbar";
import Footer from "../components/layout/Footer";
import NoEmployeeInfo from "../components/no-employee-info/NoEmployeeInfo";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/users");
      const data = await response.json();
      setUsers(data);
      // console.log("📋 Lista de usuarios:", data);
    } catch (error) {
      console.error("❌ Error al obtener la lista de usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
     <Navbar className="bg-color-secondary" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        {loading ? (
          <NoEmployeeInfo />
        ) : (
          <UserList users={users} />
        )}
      </div>
      <Footer />
    </>
  );
}