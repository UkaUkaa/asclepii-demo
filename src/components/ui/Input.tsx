"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon, iconPosition = "left", fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#4A6180]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8298B0] pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 bg-white border rounded-[6px] px-4 py-2",
              "text-sm text-[#0C1929] placeholder:text-[#8298B0]",
              "border-[#D6E3F0] focus:border-[#1A9EC9] focus:ring-2 focus:ring-[#1A9EC9]/20",
              "outline-none transition-all duration-200",
              "disabled:bg-[#F2F6FB] disabled:cursor-not-allowed",
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20",
              className
            )}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8298B0] pointer-events-none">
              {icon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#8298B0]">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, fullWidth = true, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[#4A6180]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-white border rounded-[6px] px-4 py-3 min-h-[100px]",
            "text-sm text-[#0C1929] placeholder:text-[#8298B0]",
            "border-[#D6E3F0] focus:border-[#1A9EC9] focus:ring-2 focus:ring-[#1A9EC9]/20",
            "outline-none transition-all duration-200 resize-y",
            error && "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[#EF4444]">{error}</p>}
        {hint && !error && <p className="text-xs text-[#8298B0]">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
