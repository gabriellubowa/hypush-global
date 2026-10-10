import React from "react";
import styled from "styled-components";

// Text input or textarea with a label that floats up on focus or once filled.

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
`;

// Minimal underline fields: transparent background, bottom border only; the
// border thickens and switches to the text color on focus.
const controlStyles = `
  display: block;
  width: 100%;
  padding: 26px 2px 10px;
  font-size: 17px;
  line-height: 1.4;
  color: var(--color-text);
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--color-card-border);
  border-radius: 0;
  transition: border-color var(--duration-fast) linear, box-shadow var(--duration-fast) linear;

  &:hover {
    border-bottom-color: var(--color-muted);
  }

  &:focus {
    outline: none;
    border-bottom-color: var(--color-text);
    box-shadow: 0 1px 0 0 var(--color-text);
  }

  &[aria-invalid="true"] {
    border-bottom-color: var(--color-accent);
  }
`;

const Label = styled.label`
  position: absolute;
  top: 18px;
  left: 2px;
  font-size: 16px;
  line-height: 1.2;
  color: var(--color-muted);
  pointer-events: none;
  transform-origin: left top;
  transition: transform 180ms var(--ease-out-expo), color var(--duration-fast) linear;
`;

const Input = styled.input`
  ${controlStyles}

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    transform: translateY(-10px) scale(0.78);
  }

  &:focus + ${Label} {
    color: var(--color-text);
  }
`;

const Textarea = styled.textarea`
  ${controlStyles}
  min-height: 160px;
  resize: vertical;
  line-height: 1.6;

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    transform: translateY(-10px) scale(0.78);
  }

  &:focus + ${Label} {
    color: var(--color-text);
  }
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--color-muted);

  [data-error] {
    color: var(--color-text);
    font-weight: 600;
  }
`;

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
  maxLength?: number;
  multiline?: boolean;
}

export function FloatingField(props: Props) {
  const messageId = `${props.id}-message`;
  const message = props.error ?? props.hint;
  const shared = {
    id: props.id,
    name: props.id,
    value: props.value,
    // A blank placeholder lets CSS detect "has a value" with :placeholder-shown.
    placeholder: " ",
    required: true,
    maxLength: props.maxLength,
    "aria-invalid": props.error ? true : undefined,
    "aria-describedby": message ? messageId : undefined,
    onBlur: props.onBlur,
  };
  return (
    <Wrapper>
      {props.multiline ? (
        <Textarea {...shared} onChange={(event) => props.onChange(event.target.value)} />
      ) : (
        <Input
          {...shared}
          type={props.type ?? "text"}
          autoComplete={props.autoComplete}
          inputMode={props.inputMode}
          onChange={(event) => props.onChange(event.target.value)}
        />
      )}
      <Label htmlFor={props.id}>{props.label}</Label>
      {message && (
        <Meta>
          <span id={messageId} data-error={props.error ? "" : undefined}>
            {message}
          </span>
        </Meta>
      )}
    </Wrapper>
  );
}
