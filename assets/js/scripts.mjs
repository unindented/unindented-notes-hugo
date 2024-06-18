const $ = document.querySelector.bind(document);

const mainElement = /** @type {HTMLElement} */ ($("#main"));

const colorSchemeRadios = /** @type {HTMLElement} */ ($("#color-scheme-radios"));

const searchButton = /** @type {HTMLButtonElement} */ ($("#search-button"));
const searchDialog = /** @type {HTMLDialogElement} */ ($("#search-dialog"));
const searchDialogInput = /** @type {HTMLInputElement} */ ($("#search-dialog-input"));
const searchDialogConfirmButton = /** @type {HTMLButtonElement} */ ($("#search-dialog-confirm-button"));
const searchDialogResults = /** @type {HTMLElement} */ ($("#search-dialog-results"));

// Links //////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { addLinkListener } from "./links.mjs";
addLinkListener({ container: mainElement });

// Color scheme ///////////////////////////////////////////////////////////////////////////////////////////////////////

import { addColorSchemeListener } from "./color-scheme.mjs";
addColorSchemeListener({
  radios: colorSchemeRadios,
  localStorageKey: "color-scheme",
});

// Search dialog //////////////////////////////////////////////////////////////////////////////////////////////////////

/*
{{ $fuzzysortScript := resources.Get "js/fuzzysort-v3.0.2/fuzzysort.min.mjs" }}
{{ $searchIndexUrl := "search.json" | relURL }}
{{ $spriteSheetUrl := "images/sprites.svg" | relURL }}
*/

import { addSearchListener } from "./search.mjs";
addSearchListener({
  button: searchButton,
  dialog: searchDialog,
  dialogInput: searchDialogInput,
  dialogConfirmButton: searchDialogConfirmButton,
  dialogResults: searchDialogResults,
  fuzzysortScript: "{{ $fuzzysortScript.RelPermalink }}",
  indexUrl: "{{ $searchIndexUrl }}",
  spriteSheetUrl: "{{ $spriteSheetUrl }}",
});

// Hotkeys ////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { addHotkeyListener } from "./hotkeys.mjs";
addHotkeyListener();

// Math //////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
{{ $katexScript := resources.Get "js/katex-v0.16.10/katex.min.mjs" }}
{{ $katexStyles := resources.Get "js/katex-v0.16.10/katex.min.css" }}
*/

import { addMathObserver } from "./math.mjs";
addMathObserver({
  container: mainElement,
  katexScript: "{{ $katexScript.RelPermalink }}",
  katexStylesheet: "{{ $katexStyles.RelPermalink }}",
});

// Service Worker /////////////////////////////////////////////////////////////////////////////////////////////////////

/*
{{ $serviceWorker := resources.Get "js/service-worker.js" |
                     resources.ExecuteAsTemplate "service-worker.js" . }}
*/

// @ts-ignore
if ("serviceWorker" in navigator && "{{ hugo.IsProduction }}" === "true") {
  // Register service worker with the right scope...
  navigator.serviceWorker.register("{{ $serviceWorker.RelPermalink }}", {
    scope: '{{ "" | relURL }}',
  });
  // ... and trim caches on load.
  window.addEventListener("load", () => {
    navigator.serviceWorker.controller?.postMessage({ command: "trimCaches" });
  });
}
