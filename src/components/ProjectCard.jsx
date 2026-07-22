import React from "react";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const FigmaIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5A3.5 3.5 0 0 1 8.5 2zM12 2h3.5a3.5 3.5 0 1 1-3.5 3.5V2zm0 7h3.5a3.5 3.5 0 1 1-3.5 3.5V9zm-7 3.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5a3.5 3.5 0 0 1-3.5-3.5zm0 7A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
  </svg>
);

export default function ProjectCard({ title, description, tags, category, link, image }) {
  const isGithub = link.includes("github.com");
  const isFigma = link.includes("figma.com");
  const isPrototype = link.includes("/proto/");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-gray-700/60 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(170,59,255,0.08)] hover:border-[var(--color-primary)]/40 transition-all duration-500 flex flex-col h-full"
    >
      {/* Project Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-400 dark:text-gray-600 font-semibold italic text-sm">No Image Available</div>
        )}
        <div className="absolute top-4 left-4 bg-[var(--color-primary)]/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md select-none">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-extrabold uppercase tracking-wide bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-between items-center mt-auto border-t border-gray-100 dark:border-gray-800/80 pt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary)] transition-colors duration-300 cursor-pointer"
          >
            {isGithub ? (
              <>
                <GithubIcon className="w-4 h-4" /> GitHub Repository
              </>
            ) : isFigma ? (
              <>
                <FigmaIcon className="w-4 h-4 text-[#F24E1E]" /> {isPrototype ? "View Figma Prototype" : "View Figma Design"}
              </>
            ) : (
              <>
                <ExternalLink size={16} /> View Case Study
              </>
            )}
          </a>
        </div>
      </div>
    </motion.div>
  );
}
