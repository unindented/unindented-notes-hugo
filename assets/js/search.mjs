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
      fetch(indexUrl).then((response) => response.json()),
      import(fuzzysortScript),
    ]);
  }

  const { value } = dialogInput;
  const results = fuzzysort.go(value, index, fuzzysortConfig);
  dialogResults.innerHTML = renderSearchResults(results);
};

/**
 * @param {FuzzySortKeysResults} results
 * @returns {string}
 */
const renderSearchResults = (results) => {
  return `
<h2 class="sr-only">Search results</h2>
${results.map((result) => renderSearchResult(result)).join("\n")}
    `;
};

/**
 * @param {FuzzySortKeysResult} result
 * @returns {string}
 */
const renderSearchResult = (result) => {
  const [title, content] = result.map((r) => r.highlight("<u>", "</u>"));

  return `
<article class="border-b border-gray-200 py-2 last:border-b-0 dark:border-gray-700 sm:py-4">
  <h3>
    <a
      href="${result.obj.permalink}"
      class="text-2xl font-bold text-gray-700 hover:text-blue-700 focus:text-blue-700 dark:text-gray-300 dark:hover:text-blue-300 dark:focus:text-blue-300"
      >${title || result.obj.title} ${result.score}</a
    >
  </h3>
  <p class="mt-2 truncate text-base text-gray-600 dark:text-gray-400">${content || result.obj.content}</p>
</article>
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
 * @property {string} indexUrl
 * @property {string} fuzzysortScript
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
