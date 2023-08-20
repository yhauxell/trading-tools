/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      aria: {
        invalid: true,
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [],
}

