import styled, { keyframes } from "styled-components";

// No container box: the form sits directly on the page and fills its column.
export const Card = styled.form`
  width: 100%;
  max-width: 600px;
`;

// Each step slides in from the direction of travel.
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(var(--enter-from)); }
  to   { opacity: 1; transform: translateX(0); }
`;

export const Panel = styled.div<{ $direction: number }>`
  --enter-from: ${(props) => (props.$direction < 0 ? "-28px" : "28px")};
  animation: ${slideIn} 380ms var(--ease-out-expo) both;
`;

export const StepHeading = styled.div`
  margin: 2rem 0 1.75rem;

  h2 {
    padding: 0;
    font-size: clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.04em;

    &:focus {
      outline: none;
    }
  }

  p {
    margin: 0.5rem 0 0;
    color: var(--color-secondary);
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 16px;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-card-border);
`;

const buttonBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-left: auto;
  padding: 16px 30px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out-expo), opacity var(--duration-fast) linear;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

export const NextButton = styled.button`
  ${buttonBase}
  background: var(--color-text);
  color: var(--color-background);
`;

export const SubmitButton = styled.button`
  ${buttonBase}
  padding: 18px 34px;
  font-size: 17px;
  background: var(--color-accent);
  color: var(--color-on-accent);
  box-shadow: 0 14px 30px -16px var(--color-accent);
`;

export const BackButton = styled.button`
  padding: 12px 4px;
  border: none;
  background: none;
  color: var(--color-text);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: var(--color-accent);
  }
`;

export const Hint = styled.p`
  flex-basis: 100%;
  margin: 0;
  font-size: 13px;
  color: var(--color-muted);
  text-align: right;

  @media (max-width: 520px) {
    text-align: center;
  }
`;

export const Notice = styled.p`
  margin: 1.25rem 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-muted);

  a {
    color: var(--color-text);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const ErrorBanner = styled.p`
  margin: 1.25rem 0 0;
  padding: 12px 16px;
  border-radius: 10px;
  border-left: 4px solid var(--color-accent);
  background: var(--color-card);
  font-size: 15px;
  font-weight: 600;
`;

export const RestoredBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.25rem;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--color-card);
  font-size: 14px;

  button {
    padding: 0;
    border: none;
    border-bottom: 2px solid var(--color-accent);
    background: none;
    color: var(--color-text);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
`;

// Hidden from people (and screen readers) but present for bots to fill.
export const Honeypot = styled.div`
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
