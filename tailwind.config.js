/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        button: '#FF7D04',
        primary: '#FED08C',
        secondary: '#FFD8B4',
        tertiary: '#FFEBD1',
        quatenary: '#FDF7EF'
      },
  
    },
  },
  plugins: [],
}
