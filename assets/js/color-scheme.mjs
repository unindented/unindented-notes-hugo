/**
 * Toggles the color scheme of the page between light and dark when the button is clicked.
 *
 * @param {Options} options
 */
export const addColorSchemeListener = ({ button }) => {
  const { classList: colorSchemeClass } = document.documentElement;
  const colorSchemeMeta = /** @type {HTMLMetaElement} */ (document.querySelector('meta[name="color-scheme"]'));

  button.addEventListener("click", () => {
    const colorScheme = colorSchemeClass.toggle("dark") ? "dark" : "light";
    colorSchemeMeta.setAttribute("content", colorScheme);
    localStorage.setItem("color-scheme", colorScheme);
  });
};

/**
 * @typedef {object} Options
 * @property {HTMLButtonElement} options.button
 */
