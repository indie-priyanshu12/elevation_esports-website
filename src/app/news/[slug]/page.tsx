import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { connectToDatabase } from "@/lib/db/mongoose";
import { NewsPost } from "@/lib/db/models";
import { isDatabaseConfigured } from "@/lib/db/mongoose";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isDatabaseConfigured()) return { title: "News | Elevation Esports" };

  await connectToDatabase();
  const post = await NewsPost.findOne({ slug, is_published: true }).lean() as any;
  if (!post) return { title: "News Not Found | Elevation Esports" };

  return {
    title: `${post.title} | Elevation Esports`,
    description: post.summary || "Read the latest news from Elevation Esports.",
    openGraph: {
      title: post.title,
      description: post.summary || "",
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
    },
  };
}

function formatDate(date: Date | string | null) {
  if (!date) return "Unknown Date";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsSlugPage({ params }: Props) {
  const { slug } = await params;

  if (!isDatabaseConfigured()) {
    notFound();
  }

  await connectToDatabase();
  const post = await NewsPost.findOne({ slug, is_published: true }).lean() as any;

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-obsidian text-ice flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Back link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 font-mono text-sm text-neon-cyan hover:text-white transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to News
        </Link>

        {/* Header */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <div className="mb-4">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-neon-cyan">
              {formatDate(post.published_at)}
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4">
            {post.title}
          </h1>
          {post.summary && (
            <p className="font-sans text-lg text-ice/70 leading-relaxed">
              {post.summary}
            </p>
          )}
        </div>

        {/* Cover Image */}
        {post.cover_image_url && (
          <div className="mb-10 rounded-xl overflow-hidden border border-white/10 aspect-video relative bg-white/5">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-invert max-w-none font-sans text-ice/80 leading-relaxed [&>p]:mb-4 [&>h1]:text-white [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-white [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-white [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>li]:mb-1 [&>a]:text-neon-cyan hover:[&>a]:text-neon-pink [&>strong]:text-white [&>strong]:font-bold whitespace-pre-wrap">
          {post.content || post.summary || "No content available."}
        </article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-neon-pink hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Transmissions
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
