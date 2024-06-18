const typography = require("@tailwindcss/typography");

const { config: customColors } = require("./tailwind.colors");
const { config: customTypography } = require("./tailwind.typography");

module.exports = {
  content: ["./content/**/*.md", "./layouts/**/*.html", "./static/js/*.js", "./static/js/*.mjs"],
  plugins: [typography],
  darkMode: "class",
  theme: {
    colors: customColors,
    extend: {
      brightness: {
        80: "0.8",
      },
      contrast: {
        120: "1.2",
      },
      spacing: {
        article: "55ch",
      },
      willChange: {
        "z-index": "z-index",
      },
      typography: customTypography,
    },
  },
};
