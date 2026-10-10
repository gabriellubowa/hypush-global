import styled from "styled-components";

// Two-pane home page section framed by edge marks. Panes sit side by side on
// wide screens and stack (in source order) below 1024px.

export const SplitSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 3rem 0;

  @media (max-width: 1024px) {
    padding: 1.5rem 0;
  }
`;

export const EdgeMark = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

interface IPaneProps {
  $maxWidth: string;
  $center?: boolean;
  // Stack after the other pane on small screens.
  $mobileLast?: boolean;
}

// Leading (left) pane: outer margin plus 3rem of inset unless $flush.
export const LeadPane = styled.div<IPaneProps & { $flush?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: ${(props) => (props.$center ? "center" : "normal")};
  max-width: ${(props) => props.$maxWidth};
  margin: var(--margins-lg);
  padding-left: ${(props) => (props.$flush ? "0" : "3rem")};

  @media (max-width: 1024px) {
    order: ${(props) => (props.$mobileLast ? 1 : 0)};
    width: 100%;
    max-width: 100%;
    margin: var(--margins-lg) 0;
    padding-left: 0;
  }
`;

// Trailing (right) pane: 3rem of inset on the outer edge.
export const TrailPane = styled.div<IPaneProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: ${(props) => (props.$center ? "center" : "normal")};
  max-width: ${(props) => props.$maxWidth};
  padding-right: 3rem;

  @media (max-width: 1024px) {
    order: ${(props) => (props.$mobileLast ? 1 : 0)};
    width: 100%;
    max-width: 100%;
    padding: var(--margins-lg) 0;
  }
`;
