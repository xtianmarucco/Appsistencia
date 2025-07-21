import { useEffect, useState } from "react";

export default function Footer() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Oculta al hacer scroll hacia abajo
      } else {
        setVisible(true); // Muestra al hacer scroll hacia arriba
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <footer
      className={`w-full bg-[var(--color-accent-bg)] py-4 text-center text-sm text-white mt-12 sticky bottom-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-label="Pie de página"
    >
      Diseñado y desarrollado por Christian Marucco Gonzalez @ 2025
    </footer>
  );
}