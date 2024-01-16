/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('./src/assets/background.jpeg')"
      }
    }
  },
  plugins: []
};
