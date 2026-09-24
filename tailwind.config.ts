import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#1a1a1a",
          secondary: "#252525",
          elevated: "#2a2a2a",
        },
        accent: {
          DEFAULT: "#6b7280",
          cyan: "#6b7280",
        },
        text: {
          primary: "#d1d5db",
          secondary: "#9ca3af",
        },
        border: {
          DEFAULT: "#374151",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

