export interface IMetadata {
  DESCRIPTION: string;
  TYPE?: string;
  CANONICAL_URL?: string;
  OG_IMAGE?: {
    URL: string;
    WIDTH: number;
    HEIGHT: number;
    ALT: string;
  };
  TAGS?: string[];
  ARTICLE_SECTION?: string;
  PUBLISHED_TIME?: string;
}

const METADATA = {
  HOST_URL: "https://hypush.co",
  SITE_NAME: "HYPush",
  TITLE: "HYPush - Music Marketing, PR, Distribution & Promotion Agency",
  DESCRIPTION:
    "HYPush plans and runs music marketing, PR, distribution and promotion campaigns for artists, labels and the brands around them.",
  TAGS: [
    "Music marketing",
    "Music PR",
    "Music promotion",
    "Distribution",
    "Personal branding",
    "Event management",
    "Digital marketing",
  ],
  OG_TYPE: "website",
  OG_IMAGE: {
    URL: "/brand/hypush-og.jpg",
    WIDTH: 392,
    HEIGHT: 314,
    ALT: "HYPush logo",
  },
  LOCALE: "en_US",
  FAVICON: {
    MEDIUM: "/favicon-32x32.png",
    SMALL: "/favicon-16x16.png",
    APPLE_TOUCH_ICON: "/apple-touch-icon.png",
  },
  MANIFEST: "/site.webmanifest",
  THEME_COLOR: "#f00809",
  SERVICES_PAGE: {
    DESCRIPTION:
      "HYPush services | Release campaigns, PR, crisis communications, content, social, SEO, events, personal branding and AI implementation.",
  },
  QUOTE_PAGE: {
    DESCRIPTION:
      "Get a Quote from HYPush | Tell us about your release, the services you need and your budget, and we'll send a proposal.",
  },
  ABOUT_PAGE: {
    DESCRIPTION:
      "About HYPush | Music marketing and PR professionals helping artists turn releases into results.",
  },
  TALENTS_PAGE: {
    DESCRIPTION:
      "HYPush Talents | An invitation-only network of artists, producers, influencers and creators.",
  },
  CONTACT_PAGE: {
    DESCRIPTION:
      "Contact HYPush | Email, phone and office details - or start a quote for your next release.",
  },
  FAQ_PAGE: {
    DESCRIPTION:
      "HYPush FAQ | How campaigns work, who we work with, timelines and what to expect when you bring us a release.",
  },
  PRIVACY_PAGE: {
    DESCRIPTION: "HYPush Privacy Policy | How HYPush handles personal data.",
  },
  TERMS_OF_SERVICE: {
    DESCRIPTION: "HYPush Terms of Service | The terms for using hypush.co.",
  },
};

export default METADATA;
