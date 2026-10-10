// HYPush design tokens, matched to the HYPush web app's chrome palette
// (--color-chrome-* and --color-brand-red in its globals.css). Values live in
// tokens.json so next.config.js can read them for the CSP script hash.
//
// The brand red is ~3.8:1 on the light background, so it is only used for
// large type, rules and graphics; body copy and small labels use --color-text.
import tokens from "./tokens.json";

export type ColorMode = "light" | "dark";

export const THEME_TOKENS = tokens;

export const COLOR_TOKENS: Record<ColorMode, Record<string, string>> =
  tokens.colors;

export const SPACING_TOKENS: Record<string, string> = tokens.spacing;

export const BRAND_RED = tokens.colors.light["--color-accent"];

export function applyColorTokens(root: HTMLElement, mode: ColorMode): void {
  Object.entries(COLOR_TOKENS[mode]).forEach(([name, value]) =>
    root.style.setProperty(name, value)
  );
}

// Initial mode on the client: saved choice, then the value the inline script
// set, then the OS preference.
export function resolveInitialColorMode(root: HTMLElement): ColorMode {
  let saved: string | null = null;
  try {
    saved = window.localStorage.getItem("color-mode");
  } catch (error) {
    saved = null;
  }
  if (saved === "light" || saved === "dark") return saved;
  const fromScript = root.style
    .getPropertyValue("--initial-color-mode")
    .replace(/['"\s]/g, "");
  if (fromScript === "light" || fromScript === "dark") return fromScript;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
