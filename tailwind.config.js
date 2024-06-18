const typography = require("@tailwindcss/typography");

const { anchor, hocus, mediaQuery, pointerQuery, spaceInline } = require("./tailwind.plugins");
const customTypography = require("./tailwind.typography");

module.exports = {
  content: [
    "./content/**/*.md",
    "./layouts/**/*.html",
    "./assets/js/*.js",
    "./assets/js/*.mjs",
    "./static/js/*.js",
    "./static/js/*.mjs",
  ],
  plugins: [typography, anchor, hocus, mediaQuery, pointerQuery, spaceInline],
  darkMode: "selector",
  theme: {
    extend: {
      brightness: {
        80: "0.8",
      },
      contrast: {
        120: "1.2",
      },
      spacing: {
        "article-container": "55ch",
        "article-content": "65ch",
      },
      typography: customTypography,

      colors: {
        uwu: {
          rosewater: "rgb(var(--uwu-rosewater) / <alpha-value>)",
          flamingo: "rgb(var(--uwu-flamingo) / <alpha-value>)",
          pink: "rgb(var(--uwu-pink) / <alpha-value>)",
          mauve: "rgb(var(--uwu-mauve) / <alpha-value>)",
          red: "rgb(var(--uwu-red) / <alpha-value>)",
          maroon: "rgb(var(--uwu-maroon) / <alpha-value>)",
          peach: "rgb(var(--uwu-peach) / <alpha-value>)",
          yellow: "rgb(var(--uwu-yellow) / <alpha-value>)",
          green: "rgb(var(--uwu-green) / <alpha-value>)",
          teal: "rgb(var(--uwu-teal) / <alpha-value>)",
          sky: "rgb(var(--uwu-sky) / <alpha-value>)",
          sapphire: "rgb(var(--uwu-sapphire) / <alpha-value>)",
          blue: "rgb(var(--uwu-blue) / <alpha-value>)",
          lavender: "rgb(var(--uwu-lavender) / <alpha-value>)",
          text: "rgb(var(--uwu-text) / <alpha-value>)",
          subtext1: "rgb(var(--uwu-subtext1) / <alpha-value>)",
          subtext0: "rgb(var(--uwu-subtext0) / <alpha-value>)",
          overlay2: "rgb(var(--uwu-overlay2) / <alpha-value>)",
          overlay1: "rgb(var(--uwu-overlay1) / <alpha-value>)",
          overlay0: "rgb(var(--uwu-overlay0) / <alpha-value>)",
          surface2: "rgb(var(--uwu-surface2) / <alpha-value>)",
          surface1: "rgb(var(--uwu-surface1) / <alpha-value>)",
          surface0: "rgb(var(--uwu-surface0) / <alpha-value>)",
          base: "rgb(var(--uwu-base) / <alpha-value>)",
          mantle: "rgb(var(--uwu-mantle) / <alpha-value>)",
          crust: "rgb(var(--uwu-crust) / <alpha-value>)",
        },
      },
    },
  },
};
