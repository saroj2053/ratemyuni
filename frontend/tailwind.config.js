/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#ff3366",
        "default-primary": "#eb2f64",
        "primary-dark": "#ba265d",

        "grey-light-1": "#faf9f9",
        "grey-light-2": "#f4f2f2",
        "grey-light-3": "#f0eeee",
        "grey-light-4": "#ccc",

        "grey-dark-1": "#333",
        "grey-dark-2": "#777",
        "grey-dark-3": "#999",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
