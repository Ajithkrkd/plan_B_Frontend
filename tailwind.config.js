/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Create a new color group named 'button_1'
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
