// HYPush service catalogue. Service names follow the HYPush web app's
// /services hub; the descriptions are original draft copy for HYPush to
// review before publishing.

export interface IService {
  slug: string;
  name: string;
  summary: string;
}

export interface IServiceGroup {
  slug: string;
  name: string;
  intro: string;
  services: ReadonlyArray<IService>;
}

export const SERVICE_GROUPS: ReadonlyArray<IServiceGroup> = [
  {
    slug: "release",
    name: "Release & Promotion",
    intro: "Get the music out and in front of the right ears.",
    services: [
      {
        slug: "music-promotion",
        name: "Music Promotion",
        summary:
          "Release plans, playlist and radio pitching, and distribution set-up, so a new song reaches listeners on day one instead of month three.",
      },
      {
        slug: "entertainment-marketing",
        name: "Entertainment Marketing",
        summary:
          "Campaigns for tours, festivals, films and shows that turn an announcement into a date people actually put in their calendar.",
      },
      {
        slug: "event-management",
        name: "Event Management",
        summary:
          "Launch parties, listening sessions and showcases planned end to end: venue, run-of-show, guest list and the content captured on the night.",
      },
    ],
  },
  {
    slug: "press",
    name: "Press & Reputation",
    intro: "Shape the story people tell about you.",
    services: [
      {
        slug: "pr",
        name: "Public Relations",
        summary:
          "Press releases, media lists and interview pitching that put your story in front of the journalists, bloggers and presenters your audience follows.",
      },
      {
        slug: "crisis-pr",
        name: "Crisis PR",
        summary:
          "A calm, fast response when a story turns against you: a holding statement within hours, a plan for the days after, and one clear voice.",
      },
      {
        slug: "personal-branding",
        name: "Personal Branding",
        summary:
          "Positioning, bios, photo direction and a consistent voice for artists, founders and public figures who want to be recognised for the right things.",
      },
    ],
  },
  {
    slug: "growth",
    name: "Content & Growth",
    intro: "Keep the momentum going after release day.",
    services: [
      {
        slug: "digital-marketing",
        name: "Digital Marketing",
        summary:
          "Paid social, search and streaming ads planned around one goal, with budget moved each week toward whatever is working.",
      },
      {
        slug: "content-marketing",
        name: "Content Marketing",
        summary:
          "Behind-the-scenes video, short-form clips and written stories, made on a schedule your audience can rely on.",
      },
      {
        slug: "social-media-management",
        name: "Social Media Management",
        summary:
          "Day-to-day posting, community replies and monthly reporting on the platforms where your fans already spend their time.",
      },
      {
        slug: "seo",
        name: "SEO",
        summary:
          "Search-ready artist and brand sites, so people who look you up find your music, your dates and how to book you first.",
      },
      {
        slug: "ai-implementation",
        name: "AI Implementation",
        summary:
          "Practical AI workflows for creative teams (drafting, captioning, research and reporting) set up with your people kept in the loop.",
      },
    ],
  },
];

export const SERVICE_COUNT = SERVICE_GROUPS.reduce(
  (total, group) => total + group.services.length,
  0
);
