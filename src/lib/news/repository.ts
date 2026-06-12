import { NewsPost, type INewsPost } from "@/lib/db/models";
import type { NewsRecord, NewsMutationInput } from "./types";

function mapToRecord(doc: INewsPost): NewsRecord {
  return {
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary ?? null,
    content: doc.content ?? null,
    coverImage: doc.cover_image_url ?? null,
    publishedAt: doc.published_at ? doc.published_at.toISOString() : null,
    isPublished: doc.is_published,
  };
}

export async function listNews(): Promise<NewsRecord[]> {
  const items = await NewsPost.find({ is_published: true }).sort({ published_at: -1 }).exec();
  return items.map(mapToRecord);
}

export async function getNewsBySlug(slug: string): Promise<NewsRecord | null> {
  const item = await NewsPost.findOne({ slug }).exec();
  return item ? mapToRecord(item) : null;
}

export async function createNews(input: NewsMutationInput): Promise<NewsRecord> {
  const item = new NewsPost({
    slug: input.slug,
    title: input.title,
    summary: input.summary,
    content: input.content,
    cover_image_url: input.coverImage,
    published_at: input.publishedAt ? new Date(input.publishedAt) : null,
    is_published: input.isPublished,
  });
  await item.save();
  return mapToRecord(item);
}

export async function updateNews(slug: string, input: Partial<NewsMutationInput>): Promise<NewsRecord | null> {
  const updateData: Partial<Record<keyof INewsPost, any>> = {};
  
  if (input.slug !== undefined) updateData.slug = input.slug;
  if (input.title !== undefined) updateData.title = input.title;
  if (input.summary !== undefined) updateData.summary = input.summary;
  if (input.content !== undefined) updateData.content = input.content;
  if (input.coverImage !== undefined) updateData.cover_image_url = input.coverImage;
  if (input.publishedAt !== undefined) updateData.published_at = input.publishedAt ? new Date(input.publishedAt) : null;
  if (input.isPublished !== undefined) updateData.is_published = input.isPublished;

  const item = await NewsPost.findOneAndUpdate({ slug }, updateData, { new: true }).exec();
  return item ? mapToRecord(item) : null;
}

export async function deleteNews(slug: string): Promise<boolean> {
  const result = await NewsPost.deleteOne({ slug }).exec();
  return result.deletedCount > 0;
}
