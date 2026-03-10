"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  tag?: string;
}

export function SectionHeader({ title, subtitle, centered = false, className, tag }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(centered && "text-center", className)}
    >
      {tag && (
        <div className={cn("mb-3", centered && "flex justify-center")}>
          <span className="inline-block px-3 py-1 text-xs font-medium text-[#0D3A7E] bg-[#EEF3FB] border border-[#ABC6EB] rounded-[4px] uppercase tracking-wider">
            {tag}
          </span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-light text-[#0C1929] tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-[#4A6180] font-light leading-relaxed text-lg",
          centered && "max-w-2xl mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
