/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Definimos la nueva paleta de colores inspirada en el Masters
      colors: {
        masters: {
          green: '#006747', // El verde clásico del Masters
          yellow: '#FDB927', // El amarillo para acentos y botones
          light: '#F5F5F5', // Un fondo de página blanco roto/beige claro
          dark: '#333333', // El color principal para el texto
        },
      },
      // Definimos las nuevas familias de fuentes
      fontFamily: {
        // Usaremos una fuente Serif elegante para los títulos
        serif: ['"Playfair Display"', 'serif'],
        // Y una fuente Sans-serif limpia para el cuerpo del texto
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
