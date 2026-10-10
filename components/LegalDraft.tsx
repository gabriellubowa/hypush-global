import { IMetadata } from "../constants/metadata";
import { PageIntro } from "./PageIntro";
import { SiteLayout } from "./layout/SiteLayout";
import React from "react";
import styled from "styled-components";

const DraftNotice = styled.aside`
  width: 100%;
  padding: var(--margins-lg);
  margin-bottom: var(--margins-xl);
  border-left: 4px solid var(--color-accent);
  background: var(--color-surface);

  strong {
    display: block;
    margin-bottom: 4px;
  }

  p {
    margin: 0;
  }
`;

const SectionList = styled.ol`
  margin: 0;
  padding-left: 1.4em;
  max-width: 72ch;

  li {
    padding: var(--margins-md) 0;
    border-bottom: 1px solid var(--color-border-accordion);
  }

  li::marker {
    color: var(--color-accent);
    font-weight: 600;
  }

  h2 {
    font-size: 20px;
    line-height: 1.3;
  }

  p {
    margin: 4px 0 0;
    color: var(--color-muted);
  }
`;

export interface ILegalSection {
  heading: string;
  covers: string;
}

interface Props {
  pageTitle: string;
  metadata: IMetadata;
  sections: ReadonlyArray<ILegalSection>;
}

// Placeholder for legal pages: lists what the final document must cover
// without inventing legal terms on HYPush's behalf.
export const LegalDraft = (props: Props) => (
  <SiteLayout title={props.pageTitle} metadata={props.metadata}>
      <PageIntro eyebrow="Legal" title={props.pageTitle} />
      <DraftNotice role="note">
        <strong>Draft placeholder</strong>
        <p>
          HYPush&apos;s reviewed {props.pageTitle.toLowerCase()} replaces this
          page before launch. The outline below lists what it needs to cover.
        </p>
      </DraftNotice>
      <SectionList>
        {props.sections.map((section) => (
          <li key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.covers}</p>
          </li>
        ))}
      </SectionList>
  </SiteLayout>
);
