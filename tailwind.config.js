/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        navy: "#2C7695",
        orange: "#156064",
        lapak: "#50BFC3",
        sewa: "#00C49A",
        warga: "#FB8F67",
        hajat: "#D95877",
        "dark-text": "#1E293B",
        "grey-text": "#64748B",
        "light-bg": "#F8FAFC",
        "border-color": "#E2E8F0",
      },
    },
  },
  plugins: [],
};
