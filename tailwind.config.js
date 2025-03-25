/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: '#1DB954',
        spotifyBlack: '#121212',
        spotifyGray: '#282828',
      },
    },
  },
  plugins: [],
};
