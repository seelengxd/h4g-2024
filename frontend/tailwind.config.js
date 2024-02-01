const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FEF9F7",
          100: "#FCF2EF",
          200: "#FAEAE5",
          300: "#F5D6CC",
          400: "#EBAD99",
          500: "#E08466",
          600: "#D65B33",
          700: "#D14719",
          800: "#CC3200",
        },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
