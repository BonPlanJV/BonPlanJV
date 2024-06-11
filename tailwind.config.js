/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: { 
      backgroundImage: {
        'privacy-bg': "url('/public/icon-privacy.svg')"
      }
    }
  },
  plugins: [],
}

