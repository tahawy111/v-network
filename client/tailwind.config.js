/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#222",
        primary: `#5542f6`,
        highlight: `#eae8fb`,
        bgGray: `#fbfafd`,
        muted: "#6c757d",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
