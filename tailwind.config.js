/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        rotation: "rotation 0.75s linear infinite",
      },
      screens: {
        sm: "800px",
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%": {
            transform: translateY(0),
          },
          "100%": {
            transform: translateY("15px"),
          },
        },
      },
    },
  },
  plugins: [],
};
