/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07142c",
        police: "#11284f",
        policeMuted: "#2d4267",
        copper: "#9a741f",
        copperSoft: "#ead7a4",
        canvas: "#eef1f4",
        panel: "#f8fafc",
        line: "#cfd7e3",
        slateText: "#4a5568",
        success: "#0c7a43",
        successSoft: "#d8f7e6",
        caution: "#9a741f",
        cautionSoft: "#f7e4a8",
        alert: "#b42318",
        alertSoft: "#fee4e2",
        darkCanvas: "#0c1525",
        darkPanel: "#132035",
        darkLine: "#27405f"
      },
      fontFamily: {
        sans: ["Public Sans", "Segoe UI", "sans-serif"],
        malayalam: ["Manjari", "Noto Sans Malayalam", "sans-serif"]
      },
      boxShadow: {
        panel: "0 12px 40px rgba(7, 20, 44, 0.08)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(17, 40, 79, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(17, 40, 79, 0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
