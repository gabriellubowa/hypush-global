import React from "react";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeProvider";

// Compact square switch used in the footer's copyright line (same design as
// the HYPushEasy footer toggle).

const Switch = styled.button`
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  font-size: 12px;
  line-height: 1;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: var(--color-text);
  }
`;

const Track = styled.span`
  position: relative;
  flex: none;
  width: 36px;
  height: 20px;
  border: 1px solid var(--color-text);
`;

const Thumb = styled.span<{ $isOn: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  background: var(--color-text);
  transform: translateX(${(props) => (props.$isOn ? "16px" : "0")});
  transition: transform 0.2s ease;
`;

export function FooterThemeSwitch() {
  const { colorMode, setColorMode } = useTheme();
  const isDark = colorMode === "dark";
  return (
    <Switch
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setColorMode(isDark ? "light" : "dark")}
    >
      <Track aria-hidden="true">
        <Thumb $isOn={isDark} />
      </Track>
      <span aria-hidden="true">{isDark ? "Dark" : "Light"}</span>
    </Switch>
  );
}
