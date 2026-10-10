import { COUNTRY_ISO_VALUES, DEFAULT_COUNTRY_ISO, countryByIso } from "./countryCodes";
import { BUDGET_OPTIONS, GOAL_OPTIONS } from "./options";
import { FieldErrors, FormStep, IProjectRequest } from "./types";

export const LIMITS = {
  name: 100,
  email: 254,
  phone: 40,
  brandName: 120,
  aboutMin: 20,
  about: 3000,
};

const GOAL_VALUES = new Set(GOAL_OPTIONS.map((option) => option.value));
const BUDGET_VALUES = new Set(BUDGET_OPTIONS.map((option) => option.value));

const isBlank = (value: string) => value.trim().length === 0;

export function isValidEmail(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length <= LIMITS.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > LIMITS.phone) return false;
  const digits = trimmed.replace(/\D/g, "");
  // National number only — country dial code is selected separately.
  return digits.length >= 6 && digits.length <= 12;
}

export function formatInternationalPhone(countryIso: string, phone: string): string {
  const dial = countryByIso(countryIso)?.dial ?? "";
  const digits = phone.replace(/\D/g, "");
  return dial && digits ? `${dial}${digits}` : phone.trim();
}

function requiredText(value: string, message: string, max: number): string | undefined {
  if (isBlank(value)) return message;
  return value.trim().length > max ? `Keep this under ${max} characters.` : undefined;
}

function aboutError(value: string): string | undefined {
  const length = value.trim().length;
  if (length === 0) return "Tell us a little about the music and what you need.";
  if (length < LIMITS.aboutMin) return `A few more words, please (at least ${LIMITS.aboutMin} characters).`;
  return length > LIMITS.about ? `Keep this under ${LIMITS.about} characters.` : undefined;
}

type ErrorEntry = [string, string | undefined];

const collect = (entries: ReadonlyArray<ErrorEntry>): FieldErrors =>
  Object.fromEntries(entries.filter((entry): entry is [string, string] => Boolean(entry[1])));

const STEP_VALIDATORS: Record<FormStep, (values: IProjectRequest) => FieldErrors> = {
  basics: (values) =>
    collect([
      ["name", requiredText(values.name, "Tell us your name.", LIMITS.name)],
      ["email", isValidEmail(values.email) ? undefined : "Enter a valid email address."],
      [
        "countryCode",
        COUNTRY_ISO_VALUES.has(values.countryCode) ? undefined : "Choose a country code.",
      ],
      [
        "phone",
        isBlank(values.phone)
          ? "Add a phone number."
          : isValidPhone(values.phone)
            ? undefined
            : "Enter a valid phone number.",
      ],
      ["brandName", requiredText(values.brandName, "Add the artist or company name.", LIMITS.brandName)],
    ]),
  project: (values) =>
    collect([
      ["about", aboutError(values.about)],
      ["goal", GOAL_VALUES.has(values.goal) ? undefined : "Choose your primary goal."],
    ]),
  budget: (values) =>
    collect([["budget", BUDGET_VALUES.has(values.budget) ? undefined : "Choose a budget range."]]),
};

export function validateStep(step: FormStep, values: IProjectRequest): FieldErrors {
  return STEP_VALIDATORS[step](values);
}

export function isStepComplete(step: FormStep, values: IProjectRequest): boolean {
  return Object.keys(validateStep(step, values)).length === 0;
}

export function validateRequest(values: IProjectRequest): FieldErrors {
  return {
    ...validateStep("basics", values),
    ...validateStep("project", values),
    ...validateStep("budget", values),
  };
}

export function buildSubmission(values: IProjectRequest): IProjectRequest {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    countryCode: values.countryCode,
    phone: formatInternationalPhone(values.countryCode, values.phone),
    brandName: values.brandName.trim(),
    about: values.about.trim(),
    goal: values.goal,
    budget: values.budget,
    website: values.website,
  };
}

const asString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

// Coerces an untrusted JSON body into the request shape: unknown keys are
// dropped and wrong types become empty values for validation to reject.
export function parseRequestBody(raw: unknown): IProjectRequest | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const body = raw as Record<string, unknown>;
  return {
    name: asString(body.name),
    email: asString(body.email),
    countryCode: asString(body.countryCode) || DEFAULT_COUNTRY_ISO,
    phone: asString(body.phone),
    brandName: asString(body.brandName),
    about: asString(body.about),
    goal: asString(body.goal),
    budget: asString(body.budget),
    website: asString(body.website),
  };
}
