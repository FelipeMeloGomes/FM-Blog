/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "float 1.8s infinite alternate",
      },
      screens: {
        sm: "800px",
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(15px)" },
        },
      },
    },
  },
  plugins: [],
};
