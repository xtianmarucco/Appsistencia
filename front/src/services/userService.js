const API_URL = "http://localhost:3000/api/users";

// 🔥 Función para obtener la lista de usuarios
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}` // 🔥 Si usas autenticación con JWT
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al obtener usuarios");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error en fetchUsers:", error);
    throw error;
  }
};
export const createUser = async (userData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error en createUser:", error);
      throw error;
    }
  };
  
  // 🔹 Editar usuario
  export const updateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error en updateUser:", error);
      throw error;
    }
  };
  
// 🔥 Función para eliminar usuario
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Error al eliminar usuario.");
    }

    console.log(`✅ Usuario eliminado: ${userId}`);
    return await response.json();
  } catch (error) {
    console.error("❌ Error en deleteUser:", error);
    throw error;
  }
};