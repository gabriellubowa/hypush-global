import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);

  strong {
    font-weight: 400;
    color: var(--color-text);
  }
`;

const Track = styled.div`
  height: 3px;
  border-radius: 3px;
  background: var(--color-card-border);
  overflow: hidden;
`;

// Scales on the compositor rather than animating width.
const Fill = styled.div<{ $progress: number }>`
  height: 100%;
  background: var(--color-accent);
  transform: scaleX(${(props) => props.$progress});
  transform-origin: left center;
  transition: transform 500ms var(--ease-out-expo);
`;

interface Props {
  current: number;
  total: number;
  label: string;
}

export const StepProgress = ({ current, total, label }: Props) => (
  <div>
    <Row>
      <strong>
        Step {current} of {total}
      </strong>
      <span>{label}</span>
    </Row>
    <Track aria-hidden="true">
      <Fill $progress={current / total} />
    </Track>
  </div>
);
