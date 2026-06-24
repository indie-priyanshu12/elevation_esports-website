"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NewsRecord } from "@/lib/news/types";
import ReactMarkdown from "react-markdown";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Unknown Date";
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
}

export function NewsFeed({ items, source }: { items: NewsRecord[], source: "database" | "seed" }) {
  const [selectedNews, setSelectedNews] = useState<NewsRecord | null>(null);

  // Close modal when clicking outside the modal content or on the close button
  const closeModal = () => setSelectedNews(null);

  return (
    <>
      <div className="mb-8 flex justify-center">
        {source === "seed" && (
          <p className="rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-center font-sans text-sm text-neon-cyan">
            Showing seeded sample news. Connect MongoDB to load live backend data.
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-6">📡</div>
          <h3 className="font-display text-2xl text-ice mb-3 uppercase tracking-widest">No Transmissions Yet</h3>
          <p className="font-mono text-ice/50 text-sm max-w-sm">
            No news posts have been published yet. Check back soon for the latest updates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((news) => (
            <motion.div 
              key={news.id} 
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-void/60 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyber-purple/50 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setSelectedNews(news)}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-neon-cyan">
                    {formatDate(news.publishedAt)}
                  </span>
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wide mb-4 group-hover:text-cyber-purple transition-colors duration-300 line-clamp-2">
                  {news.title}
                </h2>
                <p className="font-sans text-ice/70 leading-relaxed mb-8 flex-grow">
                  {news.summary}
                </p>
                <div className="mt-auto">
                  <span className="inline-flex items-center font-display text-sm font-bold uppercase tracking-cyber text-neon-pink group-hover:text-white transition-colors">
                    Read Transmission
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
              className="relative w-[80vw] max-w-5xl bg-void border border-cyber-purple/40 rounded-2xl shadow-[0_0_50px_rgba(188,19,254,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-white/10 flex justify-between items-start sticky top-0 bg-void/95 backdrop-blur-md z-10">
                <div className="pr-8">
                  <div className="mb-2">
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-neon-cyan">
                      {formatDate(selectedNews.publishedAt)}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wide">
                    {selectedNews.title}
                  </h2>
                </div>
                <button 
                  onClick={closeModal}
                  className="p-2 text-ice/60 hover:text-neon-pink transition-colors rounded-full hover:bg-white/5 absolute top-6 right-6"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
                {selectedNews.coverImage && (
                  <div className="mb-8 rounded-xl overflow-hidden border border-white/10 aspect-video relative bg-white/5">
                    {/* Fallback image placeholder if image loading is not set up */}
                    <img 
                      src={selectedNews.coverImage} 
                      alt={selectedNews.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="text-ice/80 max-w-none font-sans leading-relaxed [&>p]:mb-4 [&>h1]:text-white [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-white [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-3 [&>h3]:text-white [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>li]:mb-1 [&>a]:text-neon-cyan hover:[&>a]:text-neon-pink [&>strong]:text-white [&>strong]:font-bold">
                  <ReactMarkdown>
                    {selectedNews.content || selectedNews.summary || "No content available."}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
