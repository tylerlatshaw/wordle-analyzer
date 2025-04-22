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
        "w-green": "#6AAA64",
        "w-yellow": "#C9B458",
        "w-gray": "#787C7E"
      }
    }
  },
  plugins: [],
};
export default config;