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
          "100%": { position: "absolute", right: "300%" },
        },
      },
      animation: {
        teleportToRight: "teleportToRight 500ms ease-in-out 1",
        slideToLeft: "slideToLeft 1200ms ease-in-out 1",
      },
    },
  },
  plugins: [],
};
