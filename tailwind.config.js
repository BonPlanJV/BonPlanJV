/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: { 
      backgroundImage: {
        'privacy-bg': "url('/public/icon-privacy.svg')"
      },
      animation: {
        'notification': 'notification 3s ease-in-out infinite',
      },
      keyframes: {
        notification: {
          '0%, 100%': { 
            transform: 'translateX(0px)',
            opacity: '0'
          },
          '50%': { 
            transform: 'translateX(-20px)',
          },
          '100%': { 
            opacity: '1'
          },
        },
        selection: {
          '0%, 100%': { 
            opacity: '0'
          },
          '100%': { 
            opacity: '1'
          },
        }
      }
    }
  },
  plugins: [],
}

