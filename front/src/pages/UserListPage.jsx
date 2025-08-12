import { useEffect, useState, useCallback } from "react";
import UserList from "../components/user-list/UserList";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/layout/Footer";
import DatePicker from "react-datepicker"; // Asegúrate de instalar react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import NoEmployeeInfo from "../components/no-employee-info/NoEmployeeInfo";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchUsersWithHours = useCallback(async () => {
    if (!startDate || !endDate) return;

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/hours?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios con horas trabajadas:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchUsersWithHours();
  }, [startDate, endDate, fetchUsersWithHours]);

  return (
    <>
      <Navbar className="bg-color-secondary" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>

        {/* 🔥 DatePicker para seleccionar rango de fechas */}
        <div className="flex space-x-4 mb-4">
          <div>
            <label className="block text-sm font-bold">Desde:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="border px-3 py-2 w-full"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div>
            <label className="block text-sm font-bold">Hasta:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="border px-3 py-2 w-full"
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>

        {loading ? <NoEmployeeInfo/> : <UserList users={users.map(user => ({ ...user, totalShifts: user.totalShifts || 0, totalHours: user.totalHours || 0 }))} onGenerateReceipt={() => console.log('Generate Receipt')} />}
      </div>
      <Footer />
    </>
  );
}