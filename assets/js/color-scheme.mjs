const prefersLightMediaQuery = window.matchMedia("(prefers-color-scheme: light)");

/**
 * Switches the color scheme of the page.
 *
 * @param {Options} options
 */
export const addColorSchemeListener = (options) => {
  const { radios, localStorageKey } = options;

  radios.addEventListener("change", (event) => {
    const { value: colorScheme } = /** @type {HTMLInputElement} */ (event.target);
    updateColorScheme(colorScheme, options);
  });

  prefersLightMediaQuery.addEventListener("change", () => {
    const colorScheme = localStorage.getItem(localStorageKey) ?? "auto";
    updateColorScheme(colorScheme, options);
  });

  window.addEventListener("load", () => {
    const colorScheme = localStorage.getItem(localStorageKey) ?? "auto";
    updateColorScheme(colorScheme, options);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === localStorageKey) {
      updateColorScheme(event.newValue ?? "auto", options);
    }
  });
};

/**
 * @param {string | null} colorScheme
 * @param {Options} options
 */
const updateColorScheme = (colorScheme, options) => {
  const { radios, localStorageKey } = options;

  const { classList: rootClassList } = document.documentElement;
  const meta = /** @type {HTMLMetaElement} */ (document.querySelector('meta[name="color-scheme"]'));
  const inputs = /** @type {NodeListOf<HTMLInputElement>} */ (radios.querySelectorAll(`[value="${colorScheme}"]`));

  const prefersLight = prefersLightMediaQuery.matches;
  const isAutoLight = colorScheme === "auto" && prefersLight;

  // Update root class list...
  rootClassList.toggle("latte", colorScheme === "latte");
  rootClassList.toggle("frappe", colorScheme === "frappe");
  rootClassList.toggle("macchiato", colorScheme === "macchiato");
  rootClassList.toggle("mocha", colorScheme === "mocha");
  // ... meta tag...
  meta.setAttribute("content", colorScheme === "latte" || isAutoLight ? "light" : "dark");
  // ... inputs ...
  inputs.forEach(input => {
    input.checked = true;
  })
  // ... and localStorage.
  if (colorScheme) {
    localStorage.setItem(localStorageKey, colorScheme);
  } else {
    localStorage.removeItem(localStorageKey);
  }
};

/**
 * @typedef {object} Options
 * @property {HTMLElement} options.radios
 * @property {string} options.localStorageKey
 */
