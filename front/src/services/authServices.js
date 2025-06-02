export const login = async (email, password) => {
  const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error || "Error de autenticación");
  }
  return response.json();
};
export const logout = async () => {
  // Aquí podrías implementar la lógica de cierre de sesión si es necesario
  // Por ejemplo, eliminar el token del almacenamiento local o cookies
  return { message: "Sesión cerrada correctamente" };
};