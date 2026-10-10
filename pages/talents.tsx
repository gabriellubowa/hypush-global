import METADATA from "../constants/metadata";
import React from "react";
import { SiteLayout } from "../components/layout/SiteLayout";
import {
  TalentRoster,
  TalentRosterItem,
} from "../components/talents/TalentRoster";
import { TALENTS } from "../data/talents";

const artists: TalentRosterItem[] = TALENTS.map((talent) => ({
  id: talent.slug,
  name: talent.name,
  imageSrc: talent.imageSrc,
  // href: `/talents/${talent.slug}`,
}));

export default function Talents() {
  return (
    <SiteLayout title="Talents" metadata={METADATA.TALENTS_PAGE}>
      <TalentRoster artists={artists} headline="Featured Talents" />
    </SiteLayout>
  );
}
