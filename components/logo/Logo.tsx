import { BrandMark } from "./BrandMark";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const LogoLink = styled(Link)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  transition: opacity var(--duration-fast) linear;

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  onDark?: boolean;
  height?: number;
  onClick?: () => void;
}

export const Logo = ({ onDark = false, height = 40, onClick }: Props) => (
  <LogoLink href="/" aria-label="HYPush home" onClick={onClick}>
    <BrandMark onDark={onDark} height={height} />
  </LogoLink>
);
