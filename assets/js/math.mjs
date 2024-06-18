import { injectStylesheet } from "./inject.mjs";

/**
 * Renders math expressions present in children of the specified container.
 *
 * @param {Options} options
 */
export const addMathObserver = async (options) => {
  const { container } = options;

  // Render math blocks in elements already in the document...
  renderMathInElements(Array.from(container.children), options);
  // ... and also render math blocks in any children dynamically added to the container.
  const containerObserver = new MutationObserver(async (mutationList) => {
    for (const record of mutationList) {
      if (record.type === "childList") {
        renderMathInElements(Array.from(record.addedNodes), options);
      }
    }
  });
  containerObserver.observe(container, { childList: true });
};

/**
 * @param {ReadonlyArray<HTMLElement | Element | Node>} elements
 * @param {Options} options
 */
const renderMathInElements = async (elements, options) => {
  const elementsWithMath = elements.filter(isElementWithMath);
  for (const element of elementsWithMath) {
    await renderMathInElement(element, options);
  }
};

/**
 * @param {HTMLElement | Element | Node} element
 * @returns {element is HTMLElement}
 */
const isElementWithMath = (element) => {
  return "dataset" in element && element.dataset.math === "true";
};

/** @type {KatexRender} */
let renderMathWithKatex;

/**
 * @param {HTMLElement} element
 * @param {Options} options
 */
const renderMathInElement = async (element, { katexScript, katexStylesheet }) => {
  if (!renderMathWithKatex) {
    renderMathWithKatex = (await import(katexScript)).default;
    injectStylesheet("katex-stylesheet", katexStylesheet);
  }
  renderMathWithKatex(element, katexConfig);
};

/** @type {KatexConfig} */
const katexConfig = {
  output: "htmlAndMathml",
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ],
};

/**
 * @typedef {object} Options
 * @property {Element} options.container
 * @property {string} options.katexScript
 * @property {string} options.katexStylesheet
 */

/**
 * @typedef {(element: HTMLElement, config: KatexConfig) => void} KatexRender
 */
/**
 * @typedef {object} KatexConfig
 * @property {'html' | 'mathml' | 'htmlAndMathml'} output
 * @property {ReadonlyArray<{left: string, right: string, display: boolean}>} delimiters
 */
