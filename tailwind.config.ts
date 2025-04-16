import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-dmsans)", ...fontFamily.sans],
        heading: ["var(--font-quicksand)", ...fontFamily.sans],
        initial: ["var(--font-pinyon)", ...fontFamily.sans],
        poiret: ["var(--font-poiret)", "sans-serif"],
        dropcap: ["var(--font-cormorant)", ...fontFamily.serif],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        teal: "#0BCEBC",
        "teal-dark": "#09A396",
        "teal-light": "#5EEAE0",
        amber: "#FF9E2C",
        "amber-dark": "#E58A1E",
        "amber-light": "#FFBB6B",
        dark: {
          DEFAULT: "#121212",
          black: "#0A0A0A",
          slate: "#1A1A1A",
          gray: "#222222",
        },
        "dark-light": "#1A1A24",
        burgundy: {
          DEFAULT: "#5D1A2D",
          dark: "#3D0F1D",
          light: "#7D2941",
          lighter: "#9D3A55",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(11, 206, 188, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(11, 206, 188, 0.8)" },
        },
        "glow-orange": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255, 158, 44, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 158, 44, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        shimmer: "shimmer 2s infinite linear",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        glow: "glow 3s infinite ease-in-out",
        "glow-orange": "glow-orange 3s infinite ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        texture: "url('/texture.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
