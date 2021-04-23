module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        108: "54rem",
      },
    },
    fontFamily: {
      sans: ["Roboto Mono", "monospace"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
