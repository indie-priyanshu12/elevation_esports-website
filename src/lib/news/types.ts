export interface NewsRecord {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  content: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  isPublished: boolean;
}

export type NewsMutationInput = Omit<NewsRecord, "id">;
