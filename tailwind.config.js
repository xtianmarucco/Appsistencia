/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          // Colores personalizados
          primary: '#312f6a',    // Azul oscuro
          secondary: '#fbfbc4',  // Amarillo claro
          accent: '#6bace3',     // Azul claro
          error: '#e3341c',      // Rojo brillante
          errorDark: '#8a2b24',  // Rojo oscuro
          errorLight: '#b54139', // Rojo medio
          neutral: '#a494ac',    // Gris violáceo
          neutralDark: '#c3737b',// Rosa oscuro
        },
      },
    },
    plugins: [],
  };