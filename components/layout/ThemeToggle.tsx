import React from "react";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeProvider";

const Track = styled.button<{ $isDark: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isDark ? "flex-end" : "flex-start")};
  flex-shrink: 0;
  width: 76px;
  height: 31px;
  padding: 0 11px;
  border: 1px solid var(--color-text);
  border-radius: 999px;
  background: ${(props) => (props.$isDark ? "var(--color-text)" : "var(--color-background)")};
  color: ${(props) => (props.$isDark ? "var(--color-background)" : "var(--color-text)")};
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  cursor: pointer;
  transition: background-color var(--duration-fast) linear, color var(--duration-fast) linear;

  @media (max-width: 600px) {
    width: 58px;
    height: 24px;
    padding: 0 7px;
    font-size: 7px;
  }
`;

const Knob = styled.span<{ $isDark: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.$isDark ? "2px" : "calc(100% - 27px)")};
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid currentColor;
  transition: left var(--duration-normal) var(--ease-out-expo);

  svg {
    width: 15px;
    height: 15px;
  }

  @media (max-width: 600px) {
    top: 1px;
    left: ${(props) => (props.$isDark ? "1px" : "calc(100% - 21px)")};
    width: 20px;
    height: 20px;

    svg {
      width: 12px;
      height: 12px;
    }
  }
`;

const Sun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
    <circle cx={12} cy={12} r={4} />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden="true">
    <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />
  </svg>
);

// Shows the current mode; renders nothing until the mode is known on the
// client so the server never guesses wrong.
export function ThemeToggle() {
  const { colorMode, setColorMode } = useTheme();
  if (!colorMode) return null;
  const isDark = colorMode === "dark";
  return (
    <Track
      type="button"
      $isDark={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setColorMode(isDark ? "light" : "dark")}
    >
      <span aria-hidden="true">{isDark ? "DARK" : "LIGHT"}</span>
      <Knob $isDark={isDark}>{isDark ? <Moon /> : <Sun />}</Knob>
    </Track>
  );
}
