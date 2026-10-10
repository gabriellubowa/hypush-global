import { BRAND } from "./brand";

export interface TickerItem {
  label: string;
  href: string;
}

export const TICKER = {
  background: "#000000",
  color: "#ffffff",
  durationSeconds: 160,
  separatorSrc: "/brand/hypush-logo.svg",
  separatorAlt: "News ticker separator (white)",
  separatorWidth: 30,
  separatorHeight: 14,
  items: [
    { label: "Welcome to HYPush", href: "/" },
    { label: "Get a Free Quote", href: BRAND.CONTACT_URL },
    { label: "Explore Our Services", href: "/services" },
    { label: "Read the FAQ", href: "/faq" },
    { label: `Email ${BRAND.EMAIL}`, href: `mailto:${BRAND.EMAIL}` },
    { label: `Call ${BRAND.PHONE_LABEL}`, href: BRAND.PHONE_HREF },
  ] satisfies TickerItem[],
};
