import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0c1831",
        navy: "#12244d",
        sport: "#d73032",
        leaf: "#4f7d5a",
        cream: "#f5efe2",
        sand: "#e6d5bc",
      },
      boxShadow: {
        premium: "0 24px 70px rgba(12, 24, 49, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
