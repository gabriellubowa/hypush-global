import { CallToAction, PrimaryButton } from "../components/CallToAction";
import { PageIntro } from "../components/PageIntro";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout title="Page not found" metadata={{ DESCRIPTION: "This page doesn't exist on hypush.co." }}>
      <PageIntro
        eyebrow="404"
        title="This Track Isn't on the Album."
        lead="The page you're looking for doesn't exist or has moved."
      />
      <PrimaryButton href="/">
        Back to the Homepage <span aria-hidden="true">→</span>
      </PrimaryButton>
      <CallToAction />
    </SiteLayout>
  );
}
