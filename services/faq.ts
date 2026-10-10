import { IFAQGroup, IFAQItem } from "../types/faq";
import faqData from "../data/faq.json";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// data/faq.json is hand-edited, so check its shape at build time and fail
// with the offending entry rather than rendering an empty accordion.
export function parseFAQItems(raw: unknown): ReadonlyArray<IFAQItem> {
  if (!Array.isArray(raw)) {
    throw new Error("data/faq.json must contain an array of FAQ items.");
  }
  return raw.map((entry, index) => {
    const item = entry as Partial<IFAQItem>;
    const isValid =
      typeof item.id === "number" &&
      isNonEmptyString(item.tag) &&
      isNonEmptyString(item.slug) &&
      isNonEmptyString(item.question) &&
      Array.isArray(item.answer) &&
      item.answer.length > 0 &&
      item.answer.every(isNonEmptyString);
    if (!isValid) {
      throw new Error(
        `data/faq.json item ${index} is missing id, tag, slug, question or answer paragraphs.`
      );
    }
    return item as IFAQItem;
  });
}

// Groups items by tag, keeping tags in the order they first appear and
// items ordered by id.
export function groupFAQItems(
  items: ReadonlyArray<IFAQItem>
): ReadonlyArray<IFAQGroup> {
  const sorted = [...items].sort((a, b) => a.id - b.id);
  const tags = Array.from(new Set(sorted.map((item) => item.tag)));
  return tags.map((tag) => ({
    tag,
    items: sorted.filter((item) => item.tag === tag),
  }));
}

export async function fetchFAQGroups(): Promise<ReadonlyArray<IFAQGroup>> {
  return groupFAQItems(parseFAQItems(faqData));
}
