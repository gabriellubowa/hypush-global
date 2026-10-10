import { BRAND } from "../../constants/brand";
import METADATA from "../../constants/metadata";
import { IFAQGroup } from "../../types/faq";

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: METADATA.SITE_NAME,
    url: METADATA.HOST_URL,
    email: BRAND.EMAIL,
    telephone: BRAND.PHONE_LABEL,
    logo: `${METADATA.HOST_URL}${METADATA.FAVICON.APPLE_TOUCH_ICON}`,
    sameAs: [
      "https://x.com/hypush_co",
      "https://facebook.com/hypush.co",
      "https://linkedin.com/company/hypush",
      "https://instagram.com/hypush.co",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: METADATA.SITE_NAME,
    url: METADATA.HOST_URL,
    description: METADATA.DESCRIPTION,
    publisher: { "@type": "Organization", name: METADATA.SITE_NAME },
  };
}

export function faqPageJsonLd(groups: ReadonlyArray<IFAQGroup>): Record<string, unknown> {
  const entities = groups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer.join(" "),
      },
    }))
  );
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entities,
  };
}
