/**
 * Registers a `keydown` event listener for all elements on the page with `data-hotkey="<key>"`. When `<key>` is
 * pressed, its corresponding element is clicked.
 *
 * Inspired by [GitHub's hotkey](https://github.com/github/hotkey).
 */
export const addHotkeyListener = () => {
  const elementsWithHotkey = Array.from(
    /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll("[data-hotkey]")),
  );

  // Gather all hotkeys in the document...
  const hotkeyMap = getHotkeyMap(elementsWithHotkey);
  // ... and add a listener for them.
  window.addEventListener("keydown", (event) => {
    const { defaultPrevented, key, altKey, ctrlKey, metaKey, target } = event;

    if (
      defaultPrevented ||
      altKey ||
      ctrlKey ||
      metaKey ||
      !target ||
      isFormField(/** @type {HTMLElement} */ (target))
    ) {
      return;
    }

    const element = hotkeyMap[key];
    if (element != null) {
      event.preventDefault();
      element.click();
    }
  });
};

/**
 * @param {ReadonlyArray<HTMLElement>} elements
 * @returns {Record<string, HTMLElement>}
 */
const getHotkeyMap = (elements) => {
  return Array.from(elements).reduce(
    (acc, element) =>
      (element.dataset.hotkey ?? "").split(",").reduce((acc, key) => {
        if (key) {
          acc[key] = element;
        }
        return acc;
      }, acc),
    /** @type {Record<string, HTMLElement>} */ ({}),
  );
};

/**
 * @param {HTMLElement} element
 * @returns {boolean}
 */
const isFormField = (element) => {
  const name = element.nodeName.toLowerCase();
  const type = (element.getAttribute("type") ?? "").toLowerCase();

  return (
    element.isContentEditable ||
    (name === "input" &&
      type !== "checkbox" &&
      type !== "file" &&
      type !== "radio" &&
      type !== "reset" &&
      type !== "submit") ||
    name === "select" ||
    name === "textarea"
  );
};
