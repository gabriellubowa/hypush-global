import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledNavLink = styled(Link)<{ $isActive: boolean }>`
  position: relative;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: var(--margins-md) 0;
  margin-right: var(--margins-xl);
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 6px;
    height: 3px;
    background: var(--color-accent);
    transform: scaleX(${(props) => (props.$isActive ? 1 : 0)});
    transform-origin: left;
    transition: transform var(--duration-normal) var(--ease-out-expo);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 600px) {
    margin-right: var(--margins-md);
    font-size: 12px;
  }
`;

export function NavLink({ href, label }: { href: string; label: string }) {
  const { pathname } = useRouter();
  const isActive = pathname === href;
  return (
    <StyledNavLink href={href} $isActive={isActive} aria-current={isActive ? "page" : undefined}>
      {label}
    </StyledNavLink>
  );
}
