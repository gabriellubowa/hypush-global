export interface IFAQItem {
  id: number;
  tag: string;
  slug: string;
  question: string;
  answer: ReadonlyArray<string>;
}

export interface IFAQGroup {
  tag: string;
  items: ReadonlyArray<IFAQItem>;
}
