import { IChoice } from "../../lib/projectRequest/options";
import React from "react";
import styled from "styled-components";

// Large tappable choice cards. Each is a real (visually hidden) radio input,
// so arrow keys, focus and screen readers work as with native radios.

const Fieldset = styled.fieldset`
  min-width: 0;
  margin: 0 0 8px;
  padding: 0;
  border: none;
`;

const Legend = styled.legend`
  padding: 0;
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 600;
`;

const Grid = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
`;

const Face = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  min-height: 112px;
  padding: 20px 52px 20px 20px;
  border: 1px solid var(--color-card-border);
  border-radius: 14px;
  background: var(--color-card);
  color: var(--color-text);
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out-expo), border-color var(--duration-fast) linear,
    background-color var(--duration-fast) linear, color var(--duration-fast) linear;

  /* Selection dot, top right. */
  &::after {
    content: "";
    position: absolute;
    top: 18px;
    right: 18px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid var(--color-card-border);
    transition: border-color var(--duration-fast) linear, background-color var(--duration-fast) linear;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-muted);
  }

  svg {
    width: 28px;
    height: 28px;
    color: var(--color-accent);
  }

  strong {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  span {
    font-size: 14px;
    line-height: 1.45;
    color: var(--color-muted);
  }

  ${HiddenRadio}:checked + & {
    background: var(--color-text);
    border-color: var(--color-text);
    color: var(--color-background);
  }

  ${HiddenRadio}:checked + & span {
    color: var(--color-background);
    opacity: 0.75;
  }

  ${HiddenRadio}:checked + &::after {
    border-color: var(--color-accent);
    background: radial-gradient(circle, var(--color-accent) 0 45%, transparent 50%);
  }

  ${HiddenRadio}:focus-visible + & {
    box-shadow: 0 0 0 3px var(--color-background), 0 0 0 5px var(--color-accent);
  }
`;

const Label = styled.label`
  display: block;
`;

const Error = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  font-weight: 600;
`;

interface Props {
  name: string;
  legend: string;
  options: ReadonlyArray<IChoice>;
  value: string;
  onChange: (value: string) => void;
  icons?: Readonly<Record<string, React.ReactNode>>;
  columns?: number;
  large?: boolean;
  error?: string;
}

export function RadioCards(props: Props) {
  const errorId = `${props.name}-error`;
  return (
    <Fieldset
      id={`field-${props.name}`}
      aria-invalid={props.error ? true : undefined}
      aria-describedby={props.error ? errorId : undefined}
    >
      <Legend>{props.legend}</Legend>
      <Grid $columns={props.columns ?? 2}>
        {props.options.map((option) => (
          <Label key={option.value}>
            <HiddenRadio
              type="radio"
              name={props.name}
              value={option.value}
              checked={props.value === option.value}
              onChange={() => props.onChange(option.value)}
            />
            <Face>
              {props.icons?.[option.value]}
              <strong style={props.large ? { fontSize: 22 } : undefined}>{option.label}</strong>
              <span>{option.detail}</span>
            </Face>
          </Label>
        ))}
      </Grid>
      {props.error && <Error id={errorId}>{props.error}</Error>}
    </Fieldset>
  );
}
