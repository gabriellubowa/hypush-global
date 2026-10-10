import { LegalDraft } from "../components/LegalDraft";
import METADATA from "../constants/metadata";
import React from "react";

const SECTIONS = [
  {
    heading: "Who We Are",
    covers: "The legal entity behind HYPush and how to contact it.",
  },
  {
    heading: "What We Collect",
    covers:
      "Information from enquiry forms, client onboarding, analytics and server logs.",
  },
  {
    heading: "How We Use It",
    covers: "Replying to enquiries, running campaigns, billing and reporting.",
  },
  {
    heading: "Sharing",
    covers:
      "Platforms, distributors, media contacts and processors we share data with, and why.",
  },
  {
    heading: "Retention",
    covers: "How long each kind of data is kept.",
  },
  {
    heading: "Your Rights",
    covers: "Access, correction and deletion requests, and how to make one.",
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalDraft
      pageTitle="Privacy Policy"
      metadata={METADATA.PRIVACY_PAGE}
      sections={SECTIONS}
    />
  );
}
