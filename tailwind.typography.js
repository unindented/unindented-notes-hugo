const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const em = (px, base) => `${round(px / base)}em`;

const typographyModifiers = {
  sm: {
    css: [
      {
        details: {
          marginTop: em(20, 12),
          marginBottom: em(20, 12),
          paddingTop: em(8, 12),
          paddingBottom: em(8, 12),
          paddingInlineStart: em(12, 12),
          paddingInlineEnd: em(12, 12),
        },
        dd: {
          paddingInlineStart: "0",
        },
        "figure > picture > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        h1: {
          fontSize: em(22, 14),
        },
        "h5, h6": {
          marginTop: em(20, 14),
          marginBottom: em(8, 14),
          lineHeight: round(20 / 14),
        },
        hr: {
          marginTop: em(20, 14),
          marginBottom: em(20, 14),
        },
        "input[type=checkbox]": {
          width: em(12, 14),
          height: em(12, 14),
        },
        pre: {
          borderRadius: "0",
        },
        samp: {
          fontSize: em(12, 14),
        },
        ".admonition": {
          padding: em(20, 18),
        },
        ".katex-display": {
          fontSize: em(12, 14),
          lineHeight: round(20 / 12),
          marginTop: `${em(20, 12)} !important`,
          marginBottom: `${em(20, 12)} !important`,
          borderRadius: "0",
          paddingTop: em(8, 12),
          paddingBottom: em(8, 12),
          paddingInlineStart: em(12, 12),
          paddingInlineEnd: em(12, 12),
        },
        ".src-block-caption": {
          fontSize: em(12, 14),
          lineHeight: round(16 / 12),
          marginTop: em(-8, 12),
        },
      },
    ],
  },
  base: {
    css: [
      {
        details: {
          marginTop: em(24, 14),
          marginBottom: em(24, 14),
          paddingTop: em(12, 14),
          paddingBottom: em(12, 14),
          paddingInlineStart: em(16, 14),
          paddingInlineEnd: em(16, 14),
        },
        dd: {
          paddingInlineStart: "0",
        },
        "figure > picture > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        h1: {
          fontSize: em(28, 16),
        },
        "h5, h6": {
          marginTop: em(24, 16),
          marginBottom: em(8, 16),
          lineHeight: round(24 / 16),
        },
        hr: {
          marginTop: em(24, 16),
          marginBottom: em(24, 16),
        },
        "input[type=checkbox]": {
          width: em(14, 16),
          height: em(14, 16),
        },
        pre: {
          borderRadius: "0",
        },
        samp: {
          fontSize: em(14, 16),
        },
        ".admonition": {
          padding: em(20, 20),
        },
        ".katex-display": {
          fontSize: em(14, 16),
          lineHeight: round(24 / 14),
          marginTop: `${em(24, 14)} !important`,
          marginBottom: `${em(24, 14)} !important`,
          borderRadius: "0",
          paddingTop: em(12, 14),
          paddingBottom: em(12, 14),
          paddingInlineStart: em(16, 14),
          paddingInlineEnd: em(16, 14),
        },
        ".src-block-caption": {
          fontSize: em(14, 16),
          lineHeight: round(20 / 14),
          marginTop: em(-12, 14),
        },
      },
    ],
  },
  lg: {
    css: [
      {
        details: {
          marginTop: em(32, 16),
          marginBottom: em(32, 16),
          paddingTop: em(16, 16),
          paddingBottom: em(16, 16),
          paddingInlineStart: em(24, 16),
          paddingInlineEnd: em(24, 16),
        },
        dl: {
          display: "grid",
          gridGap: "0 2rem",
          gridTemplate: "auto / max-content 1fr",
        },
        "dt, dd": {
          margin: "0",
          padding: "0",
        },
        "figure > picture > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        h1: {
          fontSize: em(36, 18),
        },
        "h5, h6": {
          marginTop: em(32, 18),
          marginBottom: em(8, 18),
          lineHeight: round(28 / 18),
        },
        hr: {
          marginTop: em(28, 18),
          marginBottom: em(28, 18),
        },
        "input[type=checkbox]": {
          width: em(16, 18),
          height: em(16, 18),
        },
        pre: {
          borderRadius: "0",
        },
        samp: {
          fontSize: em(16, 18),
        },
        ".admonition": {
          padding: em(24, 24),
        },
        ".katex-display": {
          fontSize: em(16, 18),
          lineHeight: round(28 / 16),
          marginTop: `${em(32, 16)} !important`,
          marginBottom: `${em(32, 16)} !important`,
          borderRadius: "0",
          paddingTop: em(16, 16),
          paddingBottom: em(16, 16),
          paddingInlineStart: em(24, 16),
          paddingInlineEnd: em(24, 16),
        },
        ".src-block-caption": {
          fontSize: em(16, 18),
          lineHeight: round(24 / 16),
          marginTop: em(-16, 16),
        },
      },
    ],
  },
  xl: {
    css: [
      {
        details: {
          marginTop: em(36, 18),
          marginBottom: em(36, 18),
          paddingTop: em(20, 18),
          paddingBottom: em(20, 18),
          paddingInlineStart: em(24, 18),
          paddingInlineEnd: em(24, 18),
        },
        "dt, dd": {
          margin: "0",
          padding: "0",
        },
        "figure > picture > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        h1: {
          fontSize: em(42, 20),
        },
        "h5, h6": {
          marginTop: em(36, 20),
          marginBottom: em(12, 20),
          lineHeight: round(32 / 20),
        },
        hr: {
          marginTop: em(28, 20),
          marginBottom: em(28, 20),
        },
        "input[type=checkbox]": {
          width: em(18, 20),
          height: em(18, 20),
        },
        pre: {
          borderRadius: "0",
        },
        samp: {
          fontSize: em(18, 20),
        },
        ".admonition": {
          padding: em(32, 30),
        },
        ".katex-display": {
          fontSize: em(18, 20),
          lineHeight: round(32 / 18),
          marginTop: `${em(36, 18)} !important`,
          marginBottom: `${em(36, 18)} !important`,
          borderRadius: "0",
          paddingTop: em(20, 18),
          paddingBottom: em(20, 18),
          paddingInlineStart: em(24, 18),
          paddingInlineEnd: em(24, 18),
        },
        ".src-block-caption": {
          fontSize: em(18, 20),
          lineHeight: round(28 / 18),
          marginTop: em(-18, 18),
        },
      },
    ],
  },
  "2xl": {
    css: [
      {
        details: {
          marginTop: em(40, 20),
          marginBottom: em(40, 20),
          paddingTop: em(24, 20),
          paddingBottom: em(24, 20),
          paddingInlineStart: em(32, 20),
          paddingInlineEnd: em(32, 20),
        },
        "dt, dd": {
          margin: "0",
          padding: "0",
        },
        "figure > picture > *": {
          marginTop: "0",
          marginBottom: "0",
        },
        h1: {
          fontSize: em(60, 24),
        },
        "h5, h6": {
          marginTop: em(40, 24),
          marginBottom: em(16, 24),
          lineHeight: round(36 / 24),
        },
        hr: {
          marginTop: em(36, 24),
          marginBottom: em(36, 24),
        },
        "input[type=checkbox]": {
          width: em(20, 24),
          height: em(20, 24),
        },
        pre: {
          borderRadius: "0",
        },
        samp: {
          fontSize: em(20, 24),
        },
        ".admonition": {
          padding: em(40, 36),
        },
        ".katex-display": {
          fontSize: em(20, 24),
          lineHeight: round(36 / 20),
          marginTop: `${em(40, 20)} !important`,
          marginBottom: `${em(40, 20)} !important`,
          borderRadius: "0",
          paddingTop: em(24, 20),
          paddingBottom: em(24, 20),
          paddingInlineStart: em(32, 20),
          paddingInlineEnd: em(32, 20),
        },
        ".src-block-caption": {
          fontSize: em(20, 24),
          lineHeight: round(32 / 20),
          marginTop: em(-20, 20),
        },
      },
    ],
  },
};

const typographyColors = ({ theme }) => ({
  css: {
    "--tw-prose-body": theme("colors.uwu.text / 1"),
    "--tw-prose-headings": theme("colors.uwu.text / 1"),
    "--tw-prose-h1": theme("colors.uwu.mauve / 1"),
    "--tw-prose-h2": theme("colors.uwu.red / 1"),
    "--tw-prose-h3": theme("colors.uwu.peach / 1"),
    "--tw-prose-h4": theme("colors.uwu.yellow / 1"),
    "--tw-prose-h5": theme("colors.uwu.green / 1"),
    "--tw-prose-h6": theme("colors.uwu.sapphire / 1"),
    "--tw-prose-lead": theme("colors.uwu.subtext1 / 1"),
    "--tw-prose-links": theme("colors.uwu.blue / 1"),
    "--tw-prose-bold": theme("colors.uwu.text / 1"),
    "--tw-prose-counters": theme("colors.uwu.surface2 / 1"),
    "--tw-prose-bullets": theme("colors.uwu.surface1 / 1"),
    "--tw-prose-hr": theme("colors.uwu.surface1 / 1"),
    "--tw-prose-quotes": theme("colors.uwu.subtext0 / 1"),
    "--tw-prose-quote-borders": theme("colors.uwu.surface1 / 1"),
    "--tw-prose-captions": theme("colors.uwu.subtext0 / 1"),
    "--tw-prose-checkbox": `color-mix(in oklch, ${theme("colors.uwu.crust / 1")} 33%, ${theme("colors.uwu.mauve / 1")})`,
    "--tw-prose-mark": theme("colors.uwu.yellow / 1"),
    "--tw-prose-kbd": theme("colors.uwu.text / 1"),
    "--tw-prose-kbd-shadows": "var(--uwu-text)",
    "--tw-prose-code": theme("colors.uwu.text / 1"),
    "--tw-prose-pre-code": theme("colors.uwu.text / 1"),
    "--tw-prose-pre-bg": theme("colors.uwu.mantle / 1"),
    "--tw-prose-pre-shadows": "rgb(var(--uwu-shadow) / var(--uwu-shadow-alpha))",
    "--tw-prose-th-borders": theme("colors.uwu.surface2 / 1"),
    "--tw-prose-td-borders": theme("colors.uwu.surface1 / 1"),
    "--tw-prose-todo-text": theme("colors.uwu.base / 1"),
    "--tw-prose-todo-bg": theme("colors.uwu.surface2 / 1"),
  },
});

const typographyDefault = (options) => ({
  css: [
    {
      details: {
        borderColor: "var(--tw-prose-hr)",
        borderWidth: "1px",
      },
      summary: {
        cursor: "pointer",
      },
      "summary::marker": {
        color: "var(--tw-prose-hr)",
      },
      ".details > :last-child": {
        marginBottom: "0 !important",
      },
      "h1, h2, h3, h4, h5, h6": {
        color: "var(--tw-prose-heading-color)",
        textWrap: "balance",
      },
      h1: {
        "--tw-prose-heading-color": "var(--tw-prose-h1)",
      },
      h2: {
        "--tw-prose-heading-color": "var(--tw-prose-h2)",
      },
      h3: {
        "--tw-prose-heading-color": "var(--tw-prose-h3)",
      },
      h4: {
        "--tw-prose-heading-color": "var(--tw-prose-h4)",
      },
      h5: {
        "--tw-prose-heading-color": "var(--tw-prose-h5)",
        fontWeight: "600",
      },
      h6: {
        "--tw-prose-heading-color": "var(--tw-prose-h6)",
        fontWeight: "600",
      },
      "h5 strong, h6 strong": {
        color: "inherit",
        fontWeight: "700",
      },
      ".org-todo.todo": {
        backgroundColor: "var(--tw-prose-heading-color)",
        color: "var(--tw-prose-todo-text)",
      },
      ".org-todo.done": {
        backgroundColor: "var(--tw-prose-todo-bg)",
        color: "var(--tw-prose-todo-text)",
      },
      hr: {
        borderStyle: "dotted",
        borderTopWidth: "0.25rem",
      },
      "input[type=checkbox]": {
        appearance: "none",
        borderColor: "var(--tw-prose-hr)",
        borderRadius: "0",
        borderWidth: "1px",
      },
      "input[type=checkbox]:checked": {
        backgroundColor: "var(--tw-prose-checkbox)",
        backgroundImage:
          "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");",
        borderColor: "transparent",
      },
      "ol:has(> li > input[type=checkbox]), ul:has(> li > input[type=checkbox])": {
        listStyle: "none",
      },
      "ol > li:has(> input[type=checkbox]), ul > li:has(> input[type=checkbox])": {
        position: "relative",
      },
      "ol > li > input[type=checkbox], ul > li > input[type=checkbox]": {
        position: "absolute",
        transform: "translate(-175%, 50%)",
      },
      mark: {
        backgroundColor: "var(--tw-prose-mark)",
      },
      pre: {
        boxShadow: "inset 0 2px 4px 0 var(--tw-prose-pre-shadows)",
      },
      samp: {
        color: "var(--tw-prose-code)",
        fontWeight: "600",
      },
      "samp::before": {
        content: '"`"',
      },
      "samp::after": {
        content: '"`"',
      },
      "tbody td": {
        verticalAlign: "top",
      },
      ".admonition": {
        borderInlineStartWidth: "0.25rem",
      },
      ".katex-display": {
        color: "var(--tw-prose-pre-code)",
        backgroundColor: "var(--tw-prose-pre-bg)",
        boxShadow: "inset 0 2px 4px 0 var(--tw-prose-pre-shadows)",
        overflowX: "auto",
      },
      ".src-block-caption": {
        color: "var(--tw-prose-captions)",
      },
      ".figure-number, .src-block-number": {
        display: "none",
      },
    },
    typographyColors(options).css,
    ...typographyModifiers.base.css,
  ],
});

module.exports = (options) => ({
  DEFAULT: typographyDefault(options),
  ...typographyModifiers,
});
