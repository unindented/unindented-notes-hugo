export class StackNavigator {
  static #stackParam = "s";
  static #currentParam = "c";
  static #validPathnameRegExp = /^\/[0-9a-z_/]+$/i;

  /**
   * @param {HTMLAnchorElement} anchor
   * @returns {string | undefined}
   */
  static getPathnameFromAnchor(anchor) {
    if (!StackNavigator.isValidPathname(anchor.getAttribute("href"))) {
      return;
    }

    const { origin, pathname } = new URL(anchor.href);
    return window.location.origin === origin ? pathname : undefined;
  }

  /**
   * @param {string | null} pathname
   * @returns {boolean}
   */
  static isValidPathname(pathname) {
    return (pathname && StackNavigator.#validPathnameRegExp.test(pathname)) || false;
  }

  #search;
  #searchParams;

  constructor() {
    this.#search = window.location.search;
    this.#searchParams = new URLSearchParams(this.#search);
  }

  /**
   * @returns {ReadonlyArray<string>}
   */
  getStack() {
    const stack = this.#getSearchParams().getAll(StackNavigator.#stackParam);
    const stackWithoutDuplicates = Array.from(new Set(stack));
    const stackWithoutInvalidPathnames = stackWithoutDuplicates.filter(StackNavigator.isValidPathname);
    return stackWithoutInvalidPathnames.filter((pathname) => pathname !== window.location.pathname);
  }

  /**
   * @returns {string | undefined}
   */
  getCurrent() {
    const current = this.#getSearchParams().get(StackNavigator.#currentParam);
    return (StackNavigator.isValidPathname(current) && current) || undefined;
  }

  /**
   * @param {string} pathname
   */
  addItem(pathname) {
    if (!this.getStack().includes(pathname)) {
      this.#getSearchParams().append(StackNavigator.#stackParam, pathname);
    }
    this.#getSearchParams().set(StackNavigator.#currentParam, pathname);
    this.#updateState();
  }

  /**
   * @param {string} pathname
   */
  removeItem(pathname) {
    this.#getSearchParams().delete(StackNavigator.#stackParam, pathname);
    this.#getSearchParams().delete(StackNavigator.#currentParam, pathname);
    this.#updateState();
  }

  #updateState() {
    const newUrl = new URL(window.location.href);
    newUrl.search = this.#getSearchParams().toString();
    const { href } = newUrl;
    history.pushState({}, "", href);
    window.dispatchEvent(new CustomEvent("pushstate", { detail: { url: href } }));
  }

  /**
   * @returns {URLSearchParams}
   */
  #getSearchParams() {
    if (this.#search !== window.location.search) {
      this.#search = window.location.search;
      this.#searchParams = new URLSearchParams(this.#search);
    }
    return this.#searchParams;
  }
}
