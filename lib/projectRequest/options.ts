// Choices for the quote wizard, shared by the form and the API so
// both accept exactly the same values.

export interface IChoice {
  value: string;
  label: string;
  detail: string;
}

// Primary goals map onto HYPush's service disciplines (see data/services.ts),
// plus tech work for platforms, sites and AI.
export const GOAL_OPTIONS: ReadonlyArray<IChoice> = [
  { value: "release", label: "Release promotion", detail: "Playlists, radio, socials, launch events" },
  { value: "press", label: "Press & PR", detail: "Coverage, reputation, crisis support" },
  { value: "growth", label: "Content & growth", detail: "Content, social, ads and SEO" },
  { value: "tech", label: "Tech & platform", detail: "Websites, apps and AI workflows" },
];

export const BUDGET_OPTIONS: ReadonlyArray<IChoice> = [
  { value: "under-1k", label: "Under $1k", detail: "A focused push on one release" },
  { value: "1k-5k", label: "$1k – $5k", detail: "A full campaign across channels" },
  { value: "5k-plus", label: "$5k+", detail: "Ongoing, multi-channel work" },
  { value: "unsure", label: "Not sure yet", detail: "We'll suggest what fits your goal" },
];
