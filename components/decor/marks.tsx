import React from "react";
import styled, { keyframes } from "styled-components";

// Small line marks that frame sections at the page edges. All are 20px wide
// and drawn in the text color.

const MarkSvg = styled.svg`
  display: block;
  width: 20px;
  height: auto;
  color: var(--color-text);
  flex-shrink: 0;
`;

export const PlusMark = (props: { className?: string }) => (
  <MarkSvg className={props.className} viewBox="0 0 14 14" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M7 1v12M1 7h12" strokeWidth={1} strokeLinecap="round" />
  </MarkSvg>
);

export const DashMark = () => (
  <MarkSvg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
    <path d="M4 12h16" strokeWidth={2} strokeLinecap="round" />
  </MarkSvg>
);

export const RingMark = () => (
  <MarkSvg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true">
    <circle cx={10} cy={10} r={8.5} strokeWidth={1.15} />
  </MarkSvg>
);

// Turns an eighth of a revolution, pauses, and repeats: a full lap in 40s.
const stepTurn = keyframes`
  0% { transform: rotate(0deg); }
  ${Array.from({ length: 8 }, (_, i) => {
    const start = i * 12.5;
    const angle = (i + 1) * 45;
    return `${start + 2.5}% { transform: rotate(${angle}deg); } ${start + 12.5}% { transform: rotate(${angle}deg); }`;
  }).join("\n")}
`;

const Turning = styled.span`
  display: block;
  animation: ${stepTurn} 40s linear infinite;
`;

export const TurningPlusMark = () => (
  <Turning>
    <PlusMark />
  </Turning>
);

// Horizontal rule between sections: a plus at each end on wide screens.
const Rule = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  width: 100%;
`;

const RuleLine = styled.div`
  flex-grow: 1;
  height: 1px;
  margin: var(--margins-md);
  background: var(--color-text);

  @media (max-width: 1024px) {
    margin: 0;
  }
`;

const RuleEnd = styled(PlusMark)`
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const SectionRule = () => (
  <Rule role="presentation">
    <RuleEnd />
    <RuleLine />
    <RuleEnd />
  </Rule>
);
