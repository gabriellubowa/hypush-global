import { LegalDraft } from "../components/LegalDraft";
import METADATA from "../constants/metadata";
import React from "react";

const SECTIONS = [
  {
    heading: "About These Terms",
    covers: "Who the terms are between and what they apply to.",
  },
  {
    heading: "Using This Website",
    covers: "Acceptable use of hypush.co and its content.",
  },
  {
    heading: "Engagements and Quotes",
    covers:
      "How a quote becomes an agreement, what each service includes, and changes to scope.",
  },
  {
    heading: "Payment",
    covers: "Fees, ad spend, invoicing and refunds.",
  },
  {
    heading: "Client Materials and Ownership",
    covers:
      "Rights to the music, artwork and content you supply, and to the work HYPush produces.",
  },
  {
    heading: "Results and Liability",
    covers:
      "What HYPush does and does not guarantee, and limits of liability.",
  },
  {
    heading: "Ending an Engagement",
    covers: "Notice periods and what happens to work in progress.",
  },
];

export default function TermsOfService() {
  return (
    <LegalDraft
      pageTitle="Terms of Service"
      metadata={METADATA.TERMS_OF_SERVICE}
      sections={SECTIONS}
    />
  );
}
