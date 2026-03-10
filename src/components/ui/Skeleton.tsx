import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({ className, width, height, rounded = false }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton",
        rounded ? "rounded-full" : "rounded-[6px]",
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function DoctorCardSkeleton() {
  return (
    <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-6 shadow-[0_2px_20px_rgba(13,58,126,0.06)]">
      <div className="flex items-start gap-4">
        <Skeleton className="w-16 h-16 flex-shrink-0" rounded />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-1" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-6">
      <Skeleton className="w-12 h-12 mb-4" />
      <Skeleton className="h-5 w-2/3 mb-2" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-white border border-[#D6E3F0] rounded-[6px] overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5">
        <Skeleton className="h-3 w-24 mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}

export function AppointmentSkeleton() {
  return (
    <div className="bg-white border border-[#D6E3F0] rounded-[6px] p-5">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="w-20 h-8" />
      </div>
    </div>
  );
}
