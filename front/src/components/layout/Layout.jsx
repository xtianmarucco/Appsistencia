import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

export default function Layout({ children }) {
  const isLoading = useSelector((state) => state.user.isLoading);

  return (
    <div className="relative min-h-screen">
      {/* 🔥 Loader Global: Se muestra si isLoading = true */}
      {isLoading && <Loader />}

      {/* 🔹 Renderizamos las páginas dentro del Layout */}
      <main>{children}</main>
    </div>
  );
}
