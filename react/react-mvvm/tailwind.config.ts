import { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
