/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: '#79B3FF',
        button_1: {
          DEFAULT: '#0067B8', 
          'hover': '#fff', 
          'disabled': '#ced4da', 
        },
      },
    },
  },
  plugins: [],
};
