export const blogCategories = [
  'Business',
  'Coding',
  'Design',
  'Other',
] as const;
export type BlogCategories = typeof blogCategories[number];

export interface BlogArticle {
  readonly id: number;
  readonly webId: number;
  readonly language: string;
  readonly category: string;
  readonly publishDate: string;
  readonly title: string;
  readonly cover: string;
  readonly content: string;
  readonly readingTime: number;
}
