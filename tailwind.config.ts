import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#5dae3e",
          lime: "#94d03c",
          dark: "#181b1d",
          silver: "#b6c4c4",
          teal: "#469066",
          slate: "#869399",
          charcoal: "#475355",
          forest: "#088038",
          mint: "#c4e1b9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #5dae3e, #088038)",
        "gradient-brand-light": "linear-gradient(135deg, #5dae3e, #94d03c)",
      },
      animation: {
        "pulse-green": "pulse-green 2s infinite",
        "fade-up": "fadeUp 0.7s ease forwards",
      },
      keyframes: {
        "pulse-green": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(93, 174, 62, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(93, 174, 62, 0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
