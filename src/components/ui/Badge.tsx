import { cn } from "@/lib/utils/cn";

type BadgeVariant = "primary" | "accent" | "success" | "warning" | "error" | "neutral";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-[#EEF3FB] text-[#0D3A7E] border-[#ABC6EB]",
  accent: "bg-[#E6F7FC] text-[#085C7E] border-[#87D6F0]",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  error: "bg-red-50 text-red-700 border-red-200",
  neutral: "bg-[#F2F6FB] text-[#4A6180] border-[#D6E3F0]",
};

export function Badge({ variant = "neutral", size = "md", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium border rounded-[4px]",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
