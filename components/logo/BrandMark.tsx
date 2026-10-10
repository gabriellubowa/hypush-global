import React from "react";
import styled from "styled-components";

const LOGO_SRC = "/brand/hypush-logo.svg";

const Mark = styled.img<{ $onDark: boolean; $height: number }>`
  display: block;
  width: auto;
  height: ${(props) => props.$height}px;
  object-fit: contain;
  filter: ${(props) => (props.$onDark ? "brightness(0) invert(1)" : "none")};
`;

interface Props {
  onDark?: boolean;
  height?: number;
  alt?: string;
  className?: string;
}

/** Sitewide HYPush wordmark — same asset as the AMW/site header. */
export const BrandMark = ({
  onDark = false,
  height = 40,
  alt = "HYPush logo",
  className,
}: Props) => (
  <Mark
    className={className}
    src={LOGO_SRC}
    alt={alt}
    width={100}
    height={height}
    $onDark={onDark}
    $height={height}
    decoding="async"
  />
);

export const BRAND_LOGO_SRC = LOGO_SRC;
