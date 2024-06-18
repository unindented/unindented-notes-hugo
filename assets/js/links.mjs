import { StackNavigator } from "./stack-navigator.mjs";
import diff from "./udomdiff-v1.1.0/udomdiff.min.mjs";

const stackNavigator = new StackNavigator();

/**
 * Registers a `click` listener for all anchors on the page. If the target is a relative pathname, instead of navigating
 * to it, it fetches its contents, and appends them to the specified container.
 *
 * It also adds a new entry to the browser's history with all the pathnames in the stack (`s=/foo/&s=/bar/`), and the
 * current pathname (`c=/bar/`).
 *
 * _(This would be much easier to implement with the experimental [Navigation
 * API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API).)_
 *
 * @param {Options} options
 */
export const addLinkListener = (options) => {
  const renderStackInContainer = () => {
    renderStack(options);
  };

  // Render the current stack of items on page load...
  window.addEventListener("load", renderStackInContainer);
  // ... or when we navigate programatically...
  window.addEventListener("pushstate", renderStackInContainer);
  // ... or when the user presses the browser's forward/backward buttons.
  window.addEventListener("popstate", renderStackInContainer);

  options.container.addEventListener("click", async (event) => {
    const { defaultPrevented, altKey, ctrlKey, metaKey, target } = event;

    if (defaultPrevented || altKey || ctrlKey || metaKey || !target) {
      return;
    }

    const closeButton = /** @type {HTMLButtonElement} */ (
      /** @type {HTMLElement} */ (target).closest('button[data-action="close"]')
    );
    const anchor = /** @type {HTMLAnchorElement} */ (/** @type {HTMLElement} */ (target).closest("a"));

    if (closeButton) {
      // When the close button for an article is clicked, remove it from the stack.
      const pathname = closeButton.closest("article")?.dataset.pathname;
      if (pathname) {
        event.preventDefault();
        stackNavigator.removeItem(pathname);
      }
    } else if (anchor) {
      // When an anchor with a relative URL is clicked, navigate to it.
      const pathname = StackNavigator.getPathnameFromAnchor(anchor);
      if (pathname) {
        event.preventDefault();
        stackNavigator.addItem(pathname);
      }
    }
  });
};

/**
 * @param {Options} options
 */
const renderStack = async (options) => {
  const { container } = options;

  const stack = stackNavigator.getStack();
  const stackNodes = await Promise.all(stack.map((pathname) => getOrCreateElementWithPathname(pathname, options)));

  // Reconcile the old and new child nodes...
  const newNodes = [container.firstElementChild].concat(stackNodes);
  const oldNodes = Array.from(container.childNodes);
  diff(container, oldNodes, newNodes, (/** @type {Element} */ e) => e);
  // ... and scroll to the current one.
  const currentPathname = stackNavigator.getCurrent();
  if (currentPathname) {
    scrollToElementWithPathname(currentPathname, options);
    focusOnElementWithPathname(currentPathname, options);
  }
};

/**
 * @param {string} pathname
 * @param {Options} options
 * @returns {Promise<HTMLElement | null> | HTMLElement | null}
 */
const getOrCreateElementWithPathname = (pathname, options) => {
  return getElementWithPathname(pathname, options) ?? createElementWithPathname(pathname);
};

/**
 * @param {string} pathname
 * @param {Options} options
 * @returns {HTMLElement | null}
 */
const getElementWithPathname = (pathname, { container }) => {
  return container.querySelector(`[data-pathname="${pathname}"]`);
};

/**
 * @param {string} pathname
 * @returns {Promise<HTMLElement | null>}
 */
const createElementWithPathname = async (pathname) => {
  const response = await fetch(pathname);
  const responseText = await response.text();
  const fragment = document.createElement("template");
  fragment.innerHTML = responseText;
  return /** @type {HTMLElement} */ (fragment.content.querySelector("[data-pathname]"));
};

/**
 * @param {string} pathname
 * @param {Options} options
 */
const scrollToElementWithPathname = (pathname, options) => {
  const stackItem = getElementWithPathname(pathname, options);
  if (stackItem) {
    options.container.scroll({ behavior: "smooth", left: stackItem.offsetLeft });
  }
};

/**
 * @param {string} pathname
 * @param {Options} options
 */
const focusOnElementWithPathname = (pathname, options) => {
  const stackItem = getElementWithPathname(pathname, options);
  if (stackItem) {
    stackItem.querySelector("a")?.focus();
  }
};

/**
 * @typedef {object} Options
 * @property {HTMLElement} options.container
 */
