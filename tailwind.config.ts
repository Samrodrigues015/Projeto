import type { Config } from "tailwindcss";

const c = (v: string) => `hsl(var(--${v}) / <alpha-value>)`;

const config = {
  content: [
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./contexts/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1240px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        paper: c("paper"),
        ink: c("ink"),
        grey: c("grey"),
        soft: c("soft"),
        rule: c("rule"),
        pink: {
          50: c("pink-50"),
          100: c("pink-100"),
          300: c("pink-300"),
          500: c("pink-500"),
          700: c("pink-700"),
        },
        // aliases para os componentes shadcn existentes
        border: c("border"),
        input: c("input"),
        ring: c("ring"),
        background: c("background"),
        foreground: c("foreground"),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        ping: {
          "0%": { transform: "scale(.6)", opacity: "1" },
          "80%, 100%": { transform: "scale(1.7)", opacity: "0" },
        },
      },
      animation: {
        "status-ping": "ping 2.6s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
