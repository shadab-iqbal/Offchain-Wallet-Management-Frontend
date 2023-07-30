/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["pages", "components"].map((folder) => `${folder}/**/*.{tsx,jsx}`),
  theme: {
    extend: {},
  },
  plugins: [],
};
