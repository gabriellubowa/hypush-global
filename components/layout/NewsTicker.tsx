import { TICKER, TickerItem } from "../../constants/ticker";
import Link from "next/link";
import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";

// Port of AMW site ticker (`news-ticker-container` below the sticky header).
// Three copies of the items; CSS shifts by one third for a seamless loop.

const COPIES = 3;
const PERSIST_KEY = "news-ticker";

const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#");

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: ${TICKER.background};
  color: ${TICKER.color};
  font-size: 13px;
  font-weight: 500;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 0 12px;

  @media (min-width: 768px) {
    gap: 12px;
    padding: 0 16px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const Edge = styled.span<{ $side: "left" | "right" }>`
  position: absolute;
  inset-block: 0;
  ${(props) => (props.$side === "left" ? "left: 0;" : "right: 0;")}
  z-index: 2;
  width: 16px;
  pointer-events: none;
  background-image: ${(props) =>
    props.$side === "left"
      ? `linear-gradient(to right, ${TICKER.background}, transparent)`
      : `linear-gradient(to left, ${TICKER.background}, transparent)`};
`;

const Content = styled.div<{ $duration: number }>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  animation: scroll-ticker ${(props) => props.$duration}s linear infinite;

  ${ContentWrapper}:hover & {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Item = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 4px;
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    padding: 4px 12px;
  }
`;

const ItemText = styled.span`
  line-height: 1.4;
`;

const Separator = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px;
  opacity: 0.9;
  vertical-align: middle;

  img {
    display: block;
    width: ${TICKER.separatorWidth}px;
    max-width: ${TICKER.separatorWidth}px;
    min-width: ${TICKER.separatorWidth}px;
    height: auto;
    max-height: 28px;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  @media (min-width: 768px) {
    margin: 0 16px;
  }
`;

const TickerLink = ({ item, copy }: { item: TickerItem; copy: number }) => {
  const a11y = copy > 0 ? ({ tabIndex: -1, "aria-hidden": true } as const) : {};

  if (isExternal(item.href)) {
    return (
      <Item href={item.href} className="ticker-item no-underline" {...a11y}>
        <ItemText>{item.label}</ItemText>
      </Item>
    );
  }

  return (
    <Item as={Link} href={item.href} className="ticker-item no-underline" {...a11y}>
      <ItemText>{item.label}</ItemText>
    </Item>
  );
};

export const NewsTicker = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    try {
      const storageKey = `newsTicker:${PERSIST_KEY}:start`;
      let start = Number(localStorage.getItem(storageKey));
      if (!start || Number.isNaN(start)) {
        start = Date.now();
        localStorage.setItem(storageKey, String(start));
      }
      const elapsed = ((Date.now() - start) / 1000) % TICKER.durationSeconds;
      el.style.animationDelay = `-${elapsed}s`;
    } catch {
      // Persist is best-effort; animation still runs from 0.
    }
  }, []);

  const loop = Array.from({ length: COPIES }, (_, copy) =>
    TICKER.items.map((item, index) => ({ item, copy, key: `${copy}-${index}` }))
  ).flat();

  return (
    <Container
      className="news-ticker-container"
      role="region"
      aria-label="Announcements"
      data-animation-duration={TICKER.durationSeconds}
      data-persist="true"
    >
      <Wrapper className="ticker-wrapper">
        <ContentWrapper className="ticker-content-wrapper">
          <Edge $side="left" className="ticker-edge ticker-edge-left" aria-hidden="true" />
          <Edge $side="right" className="ticker-edge ticker-edge-right" aria-hidden="true" />
          <Content
            ref={contentRef}
            className="ticker-content autoplay"
            $duration={TICKER.durationSeconds}
          >
            {loop.map(({ item, copy, key }, index) => (
              <Fragment key={key}>
                <TickerLink item={item} copy={copy} />
                {index < loop.length - 1 && (
                  <Separator className="ticker-separator ticker-separator-logo" aria-hidden="true">
                    <img
                      src={TICKER.separatorSrc}
                      alt=""
                      width={TICKER.separatorWidth}
                      height={TICKER.separatorHeight}
                      loading="lazy"
                      decoding="async"
                    />
                  </Separator>
                )}
              </Fragment>
            ))}
          </Content>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};
