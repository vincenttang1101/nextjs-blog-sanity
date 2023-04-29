/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titleFont: "Roboto",
        bodyFont: "Poppins",
      },
      colors: {
        primaryColor: "black",
        secondaryColor: "white",
        highlightColor: "#D53F8C", // deep pink
        globalBgColor: "#333333", // dark gray
        mainBgColor: "#EDF2F7", // light gray
      },
      boxShadow: {
        btnShadow: "0px 0px 18px 3px rgba(52,73,94,1)",
      },
    },
  },
  plugins: [],
};
