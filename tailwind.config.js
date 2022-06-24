module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        teleportToRight: {
          "0%": { position: "absolute", right: "-100%" },
          "100%": { position: "relative", right: 0 },
        },
        slideToLeft: {
          "0%": { position: "relative", right: 0 },
          "100%": { right: "-100%" },
        },
      },
      animation: {
        teleportToRight: "teleportToRight 500ms ease-in-out 1",
        slideToLeft: "slideToLeft 500ms ease-in-out 1",
      },
    },
  },
  plugins: [],
};
