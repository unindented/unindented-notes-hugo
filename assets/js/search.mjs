/**
 * Opens a search dialog when the button is clicked.
 *
 * @param {Options} options
 */
export const addSearchListener = (options) => {
  const { button, dialog, dialogInput, dialogConfirmButton } = options;

  // Open the dialog when the button is clicked.
  button.addEventListener("click", async () => {
    dialog.showModal();
  });

  // Close the dialog when the overlay is clicked.
  dialog.addEventListener("click", (event) => {
    const { target } = event;
    if (/** @type {HTMLElement} */ (target).nodeName.toLowerCase() === "dialog") {
      dialog.close();
    }
  });

  // Close the dialog whenever we navigate (e.g. the user clicks on a search result).
  window.addEventListener("pushstate", () => {
    dialog.close();
  });

  // Execute a search whenever the dialog is opened.
  const dialogObserver = new MutationObserver(([record]) => {
    if (record.attributeName === "open" && dialog.open) {
      executeSearch(options);
    }
  });
  dialogObserver.observe(dialog, { attributes: true });

  // Execute a search whenever the input changes.
  dialogInput.addEventListener("input", () => {
    executeSearch(options);
  });

  // Execute a search whenever the confirm button is clicked.
  dialogConfirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    executeSearch(options);
  });
};

/** @type {ReadonlyArray<IndexObject>} */
let index;
/** @type {FuzzySort} */
let fuzzysort;

/**
 * @param {Options} options
 */
const executeSearch = async (options) => {
  const { dialogInput, dialogResults, indexUrl, fuzzysortScript } = options;

  if (!index || !fuzzysort) {
    [index, { default: fuzzysort }] = await Promise.all([
      fetch(indexUrl, { headers: { accept: "application/json" } }).then((response) => response.json()),
      import(fuzzysortScript),
    ]);
  }

  const { value } = dialogInput;
  const results = fuzzysort.go(value, index, fuzzysortConfig);
  dialogResults.innerHTML = renderSearchResults(results, options);
};

/**
 * @param {FuzzySortKeysResults} results
 * @param {Options} options
 * @returns {string}
 */
const renderSearchResults = (results, options) => {
  return `
<h1 class="sr-only">Search results</h2>
<ul>
${results.map((result) => renderSearchResult(result, options)).join("\n")}
</ul>
`;
};

/**
 * @param {FuzzySortKeysResult} result
 * @param {Options} options
 * @returns {string}
 */
const renderSearchResult = (result, options) => {
  const [title] = result.map((r) => r.highlight("<mark>", "</mark>"));
  const { score } = result;
  const scoreTitle = score.toFixed(3);
  const scoreIcon = score >= 0.8 ? "full" : score >= 0.5 ? "half" : "empty";

  return `
<li class="text-balance">
  <a href="${result.obj.permalink}">${title || result.obj.title}</a>
  <svg height="1em" viewbox="0 0 320 512" fill="currentColor" class="inline ps-1.5 text-uwu-surface1">
    <title id="color-scheme-label">Score ${scoreTitle}</title>
    <use href="${options.spriteSheetUrl}#icon-temperature-${scoreIcon}" />
  </svg>
</li>
`;
};

/** @type {FuzzySortConfig} */
const fuzzysortConfig = {
  keys: ["title", "content", (obj) => obj.tags.join(" ")],
  limit: 25,
  threshold: 0.25,
};

/**
 * @typedef {object} Options
 * @property {HTMLButtonElement} button
 * @property {HTMLDialogElement} dialog
 * @property {HTMLInputElement} dialogInput
 * @property {HTMLButtonElement} dialogConfirmButton
 * @property {HTMLElement} dialogResults
 * @property {string} fuzzysortScript
 * @property {string} indexUrl
 * @property {string} spriteSheetUrl
 */

/**
 * @typedef {object} IndexObject
 * @property {string} title
 * @property {string} content
 * @property {ReadonlyArray<string>} tags
 * @property {string} permalink
 */

/**
 * @typedef {object} FuzzySortResult {
 * @property {number} score
 * @property {string} target
 * @property {(highlightOpen?: string, highlightClose?: string) => string} highlight
 * @property {ReadonlyArray<number>} indexes
 */
/**
 * @typedef {object} FuzzySortKeysResult
 * @property {number} score
 * @property {IndexObject} obj
 * @property {(callback: (res: FuzzySortResult) => string) => ReadonlyArray<string>} map
 */
/**
 * @typedef {object} FuzzySortKeysResults
 * @property {number} total
 * @property {(callback: (res: FuzzySortKeysResult) => string) => ReadonlyArray<string>} map
 */
/**
 * @typedef {object} FuzzySortConfig
 * @property {ReadonlyArray<string | ((obj: IndexObject) => string)>} keys
 * @property {number} [threshold]
 * @property {number} [limit]
 * @property {boolean} [all]
 */
/**
 * @typedef {object} FuzzySort
 * @property {(search: string, targets: ReadonlyArray<IndexObject>, options?: object) => FuzzySortKeysResults} go
 */
