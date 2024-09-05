/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        rotation: "rotation 0.75s linear infinite",
        float: "float 1.8s infinite alternate",
        floating: "floating 1.8s infinite alternate",
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
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(15px)" },
        },
        floating: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(20px)" },
        },
      },
    },
  },
  plugins: [],
};
