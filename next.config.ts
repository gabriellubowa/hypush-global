import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { createHash } from "node:crypto";
import { COLOR_MODE_SCRIPT } from "./theme/colorModeScript.js";

// Allow exactly the inline color-mode script by hash instead of
// 'unsafe-inline'.
const colorModeScriptHash = createHash("sha256").update(COLOR_MODE_SCRIPT).digest("base64");

// Everything (fonts, images, scripts) is self-hosted, so no third-party
// origins are allowed. The dev server additionally needs eval for fast refresh.
function contentSecurityPolicy(isDev: boolean): string {
  const scriptSrc = ["'self'", `'sha256-${colorModeScriptHash}'`, ...(isDev ? ["'unsafe-eval'"] : [])];
  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self' data:",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "media-src 'self'",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function securityHeaders(isDev: boolean) {
  return [
    { key: "Content-Security-Policy", value: contentSecurityPolicy(isDev) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  ];
}

export default function config(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return {
    reactStrictMode: true,
    poweredByHeader: false,
    compiler: { styledComponents: true },
    // Pin the workspace root: a stray lockfile in a parent folder must not
    // change how this project is built.
    turbopack: { root: process.cwd() },
    async headers() {
      return [{ source: "/(.*)", headers: securityHeaders(isDev) }];
    },
    async redirects() {
      return [{ source: "/start-a-project", destination: "/quote", permanent: true }];
    },
  };
}
