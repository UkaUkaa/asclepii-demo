"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#0D3A7E] text-white border border-[#0D3A7E]",
    "hover:bg-[#0A2E63] hover:border-[#0A2E63]",
    "active:bg-[#082249]",
    "shadow-[0_2px_12px_rgba(13,58,126,0.3)]",
    "hover:shadow-[0_4px_20px_rgba(13,58,126,0.4)]",
  ].join(" "),
  secondary: [
    "bg-[#1A9EC9] text-white border border-[#1A9EC9]",
    "hover:bg-[#1589AE] hover:border-[#1589AE]",
    "active:bg-[#117494]",
    "shadow-[0_2px_12px_rgba(26,158,201,0.3)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[#0D3A7E] border border-transparent",
    "hover:bg-[#EEF3FB] hover:border-[#D5E2F5]",
  ].join(" "),
  outline: [
    "bg-transparent text-[#0D3A7E] border border-[#D6E3F0]",
    "hover:bg-[#EEF3FB] hover:border-[#0D3A7E]",
  ].join(" "),
  danger: [
    "bg-[#EF4444] text-white border border-[#EF4444]",
    "hover:bg-[#DC2626] hover:border-[#DC2626]",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileHover={isDisabled ? {} : { scale: 1.005 }}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative inline-flex items-center justify-center font-medium",
          "rounded-[6px] transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A9EC9] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "select-none tracking-wide",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70" />
          </span>
        )}
        <span
          className={cn(
            "flex items-center gap-inherit",
            loading && "opacity-0",
            sizeStyles[size]
          )}
        >
          {icon && iconPosition === "left" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
