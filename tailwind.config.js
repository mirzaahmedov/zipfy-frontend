/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["DM Sans", "sans-serif"],
      brand: ["Grechen Fuemen", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#6B3BF5",
      },
      boxShadow: {
        "primary-md": "0 2px 4px -2px #3B82F640, 0 4px 6px -1px #3B82F640",
        "neutral-base":
          "0px 1px 2px -1px rgba(3, 7, 18, 0.1), 0px 1px 3px rgba(3, 7, 18, 0.1)",
        "neutral-md":
          "0px 8px 10px -6px rgba(3, 7, 18, 0.05), 0px 20px 25px -5px rgba(3, 7, 18, 0.05)",
      },
    },
  },
  plugins: [],
};
