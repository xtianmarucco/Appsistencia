import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*');

        if (error) {
          throw error;
        }

        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-primary-text">Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-error">Error: {error}</p>;
  }

  return (
    <div className="p-4 bg-primary">
      <h1 className="text-2xl font-bold mb-4 text-primary-text">Lista de Usuarios</h1>
      <table className="min-w-full bg-white border border-neutral">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-primary-text">ID</th>
            <th className="py-2 px-4 border-b text-primary-text">Nombre</th>
            <th className="py-2 px-4 border-b text-primary-text">Apellido</th>
            <th className="py-2 px-4 border-b text-primary-text">Email</th>
            <th className="py-2 px-4 border-b text-primary-text">Número de Identificación</th>
            <th className="py-2 px-4 border-b text-primary-text">Rol</th>
            <th className="py-2 px-4 border-b text-primary-text">Salario por Hora</th>
            <th className="py-2 px-4 border-b text-primary-text">Activo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-secondary">
              <td className="py-2 px-4 border-b text-primary-text">{user.id}</td>
              <td className="py-2 px-4 border-b text-primary-text">{user.username}</td>
              <td className="py-2 px-4 border-b text-primary-text">{user.lastname}</td>
              <td className="py-2 px-4 border-b text-primary-text">{user.email}</td>
              <td className="py-2 px-4 border-b text-primary-text">{user.id_number}</td>
              <td className="py-2 px-4 border-b text-primary-text">{user.role}</td>
              <td className="py-2 px-4 border-b text-primary-text">{user.hourly_wage}</td>
              <td className="py-2 px-4 border-b text-primary-text">
                {user.active ? 'Sí' : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;