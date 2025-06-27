import { useState, useEffect } from "react";

export default function UserFormModal({ isOpen, onClose, onSubmit, userData }) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    id_number: "",
    role: "employee",
    hourly_wage: "",
    password: "",
    active: true,
  });

  // ✅ Si estamos editando, llenamos el formulario con los datos del usuario
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  // ✏️ Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Enviar datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData); // Llamamos a la función para crear o editar
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 🔹 Fondo oscuro con opacidad */}
      <div className="fixed inset-0 bg-gray-500 opacity-80"></div>

      {/* 🔹 Contenedor del formulario (sin opacidad) */}
      <div className="relative bg-white p-6 rounded shadow-lg w-96 z-10">
        <h2 className="text-xl font-bold mb-4">
          {userData ? "Editar Usuario" : "Crear Usuario"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Apellido"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <input
            type="text"
            name="id_number"
            placeholder="DNI / ID"
            value={formData.id_number}
            onChange={handleChange}
            className="w-full border px-3 py-2"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          >
            <option value="employee">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
          <input
            type="number"
            name="hourly_wage"
            placeholder="Salario por hora"
            value={formData.hourly_wage}
            onChange={handleChange}
            className="w-full border px-3 py-2"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <span>Activo</span>
          </label>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              {userData ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
