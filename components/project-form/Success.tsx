import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";

const Panel = styled.section`
  padding: clamp(1.5rem, 1rem + 3vw, 3rem);
  border-radius: 10px;
  background: var(--color-text);
  color: var(--color-background);

  h2 {
    color: var(--color-background);
    margin: var(--margins-md) 0;
    max-width: 18ch;

    &:focus {
      outline: none;
    }
  }

  p {
    max-width: 52ch;
    opacity: 0.85;
  }

  ol {
    margin: var(--margins-lg) 0;
    padding-left: 1.2em;
    line-height: 1.9;
  }

  li::marker {
    color: var(--color-accent);
    font-weight: 600;
  }
`;

const Check = styled.span`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: 28px;
  font-weight: 600;
`;

const Reference = styled.code`
  font-family: var(--font-mono);
  font-size: 15px;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--color-accent);
  color: var(--color-on-accent);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--margins-md);

  a,
  button {
    padding: 12px 22px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid var(--color-background);
    background: transparent;
    color: var(--color-background);
  }
`;

interface Props {
  name: string;
  email: string;
  reference: string;
  onStartAnother: () => void;
}

export const Success = ({ name, email, reference, onStartAnother }: Props) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus(), []);
  return (
    <Panel aria-labelledby="success-heading">
      <Check aria-hidden="true">✓</Check>
      <h2 id="success-heading" ref={headingRef} tabIndex={-1}>
        Thanks, {name.split(" ")[0]}. We&apos;ve got it.
      </h2>
      <p>
        Your reference is <Reference>{reference}</Reference>. We&apos;ve also sent a confirmation to {email}.
      </p>
      <ol>
        <li>Check your inbox for the confirmation email.</li>
        <li>We review your answers and reply with any questions, or a proposal and quote.</li>
        <li>Once you&apos;re happy with the plan, we get to work.</li>
      </ol>
      <Actions>
        <Link href="/services">Browse Services</Link>
        <button type="button" onClick={onStartAnother}>
          Start Another Request
        </button>
      </Actions>
    </Panel>
  );
};
