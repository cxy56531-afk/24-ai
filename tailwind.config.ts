import type { Config } from "tailwindcss";

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // We can migrate the colors from the old index.html styles here later
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        }
      },
    },
  },
  plugins: [],
  // We disable preflight to avoid conflict with Ant Design's base styles.
  // Alternatively, you can keep it enabled and use specific CSS layers.
  corePlugins: {
    preflight: false,
  },
};
export default config;