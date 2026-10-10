import React from "react";

// Line icons for the primary-goal cards, keyed by goal value.

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const GOAL_ICONS: Readonly<Record<string, React.ReactNode>> = {
  release: (
    <Icon>
      <path d="M3 10v4h3l7 4.5v-13L6 10H3z" />
      <path d="M16.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M19 7a7 7 0 0 1 0 10" />
    </Icon>
  ),
  press: (
    <Icon>
      <rect x={3} y={4.5} width={15} height={15} rx={2} />
      <path d="M18 8.5h2a1 1 0 0 1 1 1V17a2.5 2.5 0 0 1-2.5 2.5" />
      <path d="M6.5 8.5h8M6.5 12h8M6.5 15.5h5" />
    </Icon>
  ),
  growth: (
    <Icon>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </Icon>
  ),
  tech: (
    <Icon>
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M13.5 5.5l-3 13" />
    </Icon>
  ),
};
