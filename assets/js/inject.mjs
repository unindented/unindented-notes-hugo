/**
 * Injects a `<script>` tag in the document head.
 *
 * @param {string} id
 * @param {string} src
 */
export const injectScript = (id, src) => {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.src = src;
  script.id = id;

  document.head.appendChild(script);
};

/**
 * Injects a `<link>` tag in the document head.
 *
 * @param {string} id
 * @param {string} href
 */
export const injectStylesheet = (id, href) => {
  if (document.getElementById(id)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.id = id;

  document.head.appendChild(link);
};
