"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type"> {
  label?: string;
  onChange?: (value: string) => void;
}

function applyMask(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 12);
  // Strip leading 38 if user types it
  const d = digits.startsWith("38") ? digits.slice(2) : digits;

  let result = "+38 (";
  if (d.length === 0) return "+38 (";
  result += d.slice(0, 3);
  if (d.length >= 3) result += ") ";
  result += d.slice(3, 6);
  if (d.length >= 6) result += "-";
  result += d.slice(6, 8);
  if (d.length >= 8) result += "-";
  result += d.slice(8, 10);
  return result;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label, id, className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(e.target.value);
      e.target.value = masked;
      onChange?.(masked);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      if (e.key === "Backspace" && input.value === "+38 (") {
        e.preventDefault();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) e.target.value = "+38 (";
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (e.target.value === "+38 (") e.target.value = "";
    };

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#4A6180]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type="tel"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="+38 (0__) ___-__-__"
          className={cn(
            "w-full h-11 bg-white border rounded-[6px] px-4 py-2 text-sm text-[#0C1929]",
            "placeholder:text-[#8298B0] border-[#D6E3F0] focus:border-[#1A9EC9]",
            "focus:ring-2 focus:ring-[#1A9EC9]/20 outline-none transition-all duration-200",
            "disabled:bg-[#F2F6FB] disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
