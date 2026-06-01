import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#13243d",
        gold: "#c58a31",
        mist: "#eef3f8",
        slate: "#5e6d7e",
        pine: "#0e5c4a",
        rose: "#8e3d3d"
      },
      boxShadow: {
        panel: "0 18px 40px rgba(19, 36, 61, 0.10)"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Segoe UI", "Tahoma", "sans-serif"]
      },
      backgroundImage: {
        ledger:
          "radial-gradient(circle at top left, rgba(197,138,49,0.22), transparent 26%), linear-gradient(135deg, #13243d 0%, #1d3658 48%, #eef3f8 200%)"
      }
    }
  },
  plugins: []
};

export default config;
