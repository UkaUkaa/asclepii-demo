"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  hover?: boolean;
  glass?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  id?: string;
  style?: React.CSSProperties;
  "data-testid"?: string;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, glass = false, padding = "md", className, children, onClick, id, style }, ref) => {
    const baseStyles = cn(
      "rounded-[6px] border transition-all duration-250",
      glass
        ? "bg-white/72 backdrop-blur-md border-white/40"
        : "bg-white border-[#D6E3F0]",
      hover && "cursor-pointer hover:shadow-[0_8px_40px_rgba(13,58,126,0.12)]",
      !hover && "shadow-[0_2px_20px_rgba(13,58,126,0.06)]",
      paddingStyles[padding],
      className
    );

    if (hover) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={baseStyles}
          onClick={onClick}
          id={id}
          style={style}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseStyles} onClick={onClick} id={id} style={style}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5 pb-4 border-b border-[#EBF1F8]", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <h3 className={cn("text-lg font-light text-[#0C1929] tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function CardBody({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("pt-4", className)}>{children}</div>;
}
