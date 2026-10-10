import { DEFAULT_COUNTRY_ISO } from "./countryCodes";

export interface IProjectRequest {
  name: string;
  email: string;
  /** ISO 3166-1 alpha-2 country for the dial code selector. */
  countryCode: string;
  /** National phone number (without country dial prefix). */
  phone: string;
  brandName: string;
  about: string;
  goal: string;
  budget: string;
  // Honeypot: hidden from people, so any value means a bot filled the form.
  website: string;
}

export type FieldErrors = Readonly<Record<string, string>>;

export const FORM_STEPS = ["basics", "project", "budget"] as const;

export type FormStep = typeof FORM_STEPS[number];

export const EMPTY_REQUEST: IProjectRequest = {
  name: "",
  email: "",
  countryCode: DEFAULT_COUNTRY_ISO,
  phone: "",
  brandName: "",
  about: "",
  goal: "",
  budget: "",
  website: "",
};
