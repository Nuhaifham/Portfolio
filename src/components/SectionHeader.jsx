import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ title, subtitle, alignment = "left" }) {
  const isCenter = alignment === "center";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"}`}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight relative">
        {title}
        <span className={`block h-1.5 w-16 bg-gradient-to-r from-[var(--color-primary)] to-purple-500 rounded-full mt-3 ${isCenter ? "mx-auto" : ""}`} />
      </h2>
      {subtitle && (
        <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase mt-4 block">
          {subtitle}
        </span>
      )}
    </motion.div>
  );
}
