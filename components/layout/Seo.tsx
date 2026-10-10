import METADATA, { IMetadata } from "../../constants/metadata";
import { organizationJsonLd, websiteJsonLd } from "../../lib/seo/jsonLd";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  metadata?: IMetadata;
  /** Extra schema.org graphs (e.g. FAQPage). Organization + WebSite are always included. */
  jsonLd?: ReadonlyArray<Record<string, unknown>>;
}

// Page title, description, social cards and icons for every page.
export function Seo({ title, metadata, jsonLd = [] }: Props) {
  const { asPath } = useRouter();
  const pageTitle = title ? `${title} | ${METADATA.TITLE}` : METADATA.TITLE;
  const description = metadata?.DESCRIPTION ?? METADATA.DESCRIPTION;
  const path = asPath.split(/[?#]/)[0];
  const pageUrl = `${METADATA.HOST_URL}${path === "/" ? "" : path}`;
  const image = `${METADATA.HOST_URL}${METADATA.OG_IMAGE.URL}`;
  const graphs = [organizationJsonLd(), websiteJsonLd(), ...jsonLd];

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="description" content={description} />
      <meta name="keywords" content={METADATA.TAGS.join(", ")} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="theme-color" content={METADATA.THEME_COLOR} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={METADATA.OG_TYPE} />
      <meta property="og:site_name" content={METADATA.SITE_NAME} />
      <meta property="og:locale" content={METADATA.LOCALE} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content={String(METADATA.OG_IMAGE.WIDTH)} />
      <meta property="og:image:height" content={String(METADATA.OG_IMAGE.HEIGHT)} />
      <meta property="og:image:alt" content={METADATA.OG_IMAGE.ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" type="image/png" sizes="32x32" href={METADATA.FAVICON.MEDIUM} />
      <link rel="icon" type="image/png" sizes="16x16" href={METADATA.FAVICON.SMALL} />
      <link rel="apple-touch-icon" sizes="180x180" href={METADATA.FAVICON.APPLE_TOUCH_ICON} />
      <link rel="manifest" href={METADATA.MANIFEST} />

      {graphs.map((graph, index) => (
        <script
          key={`ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </Head>
  );
}
