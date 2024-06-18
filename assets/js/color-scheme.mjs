const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

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

  mediaQuery.addEventListener("change", () => {
    const colorScheme = localStorage.getItem(localStorageKey) ?? "auto";
    updateColorScheme(colorScheme, options);
  });

  window.addEventListener("load", () => {
    const colorScheme = localStorage.getItem(localStorageKey) ?? "auto";
    updateColorScheme(colorScheme, options);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === localStorageKey) {
      updateColorScheme(event.newValue, options);
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
  const radio = /** @type {HTMLInputElement} */ (radios.querySelector(`[value="${colorScheme}"]`));

  const prefersDark = mediaQuery.matches;
  const isAutoLight = colorScheme === "auto" && !prefersDark;
  const isAutoDark = colorScheme === "auto" && prefersDark;

  // Update root class list...
  rootClassList.toggle("frappe", colorScheme === "frappe");
  rootClassList.toggle("macchiato", colorScheme === "macchiato");
  rootClassList.toggle("mocha", colorScheme === "mocha" || isAutoDark);
  // ... meta tag...
  meta.setAttribute("content", colorScheme === "latte" || isAutoLight ? "light" : "dark");
  // ... radio button ...
  radio.checked = true;
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
