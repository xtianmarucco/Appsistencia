import { useSelector } from "react-redux";
import { TbLoader2 } from "react-icons/tb";


export default function Loader() {
  const isLoading = useSelector((state) => state.user.isLoading);

  if (!isLoading) return null; // 🔥 Si no está en carga, no mostrar nada

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-blue-200 bg-opacity-50 flex items-center justify-center z-0">
      <div className="flex flex-col items-center">
      <TbLoader2 className="animate-spin h-16 w-16" />

        
        <p className="mt-4 text-white text-lg font-semibold">Cargando...</p>
      </div>
    </div>
  );
}
